import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { BotConfig, StorageAdapter, Bot as TelegramBot, session } from "grammy";
import {
  Context,
  SessionData,
  createContextConstructor,
} from "#root/bot/context.js";
import {
  botAdminFeature,
  commandsFeature,
  excludeFromCrossPostingFeature,
  helpFeature,
  jobOfferConversation,
  languageFeature,
  postJobOfferFeature,
  setTopicFeature,
  unhandledFeature,
  welcomeFeature,
} from "#root/bot/features/index.js";
import { errorHandler } from "#root/bot/handlers/index.js";
import { DEFAULT_LOCALE, i18n, isMultipleLocales } from "#root/bot/i18n.js";
import { updateLogger } from "#root/bot/middlewares/index.js";
import { config as BaseConfig } from "#root/config.js";
import { logger } from "#root/logger.js";
import { conversations, createConversation } from "@grammyjs/conversations";
import { logHandle, PRIVATE_CHAT_COMMANDS } from "#root/bot/helpers/index.js";

type Options = {
  sessionStorage?: StorageAdapter<SessionData["user"]>;
  config?: Omit<BotConfig<Context>, "ContextConstructor">;
};

export function createBot(token: string, { config, sessionStorage }: Options) {
  const bot = new TelegramBot(token, {
    ...config,
    ContextConstructor: createContextConstructor({
      logger,
    }),
  });
  const protectedBot = bot.errorBoundary(errorHandler);

  // Middlewares
  bot.api.config.use(parseMode("HTML"));

  if (BaseConfig.isDev) {
    protectedBot.use(updateLogger());
  }

  protectedBot.use(autoChatAction(bot.api));
  protectedBot.use(hydrateReply);
  protectedBot.use(hydrate());
  protectedBot.use(
    session({
      type: "multi",
      conversation: {},
      user: {
        initial: () => ({ groupId: 0 }),
        storage: sessionStorage,
      },
      __language_code: { initial: () => DEFAULT_LOCALE },
    }),
  );
  protectedBot.use(i18n);
  protectedBot.use(conversations());

  // Job Offer conversation
  protectedBot.command(
    PRIVATE_CHAT_COMMANDS.CANCEL_POST_JOB_OFFER,
    logHandle("cancel-post-job-offer"),
    async (ctx) => {
      await ctx.conversation.exit();
      await ctx.reply(ctx.t("general.aborting"));
    },
  );
  protectedBot.use(createConversation(jobOfferConversation));

  // Handlers
  protectedBot.use(botAdminFeature);
  protectedBot.use(commandsFeature);
  protectedBot.use(excludeFromCrossPostingFeature);
  protectedBot.use(helpFeature);
  protectedBot.use(postJobOfferFeature);
  protectedBot.use(setTopicFeature);
  protectedBot.use(welcomeFeature);

  if (isMultipleLocales) {
    protectedBot.use(languageFeature);
  }

  // must be the last handler
  protectedBot.use(unhandledFeature);

  return bot;
}

export type Bot = ReturnType<typeof createBot>;
