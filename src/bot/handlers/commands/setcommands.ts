import { BotCommand } from "@grammyjs/types";
import { CommandContext } from "grammy";
import { DEFAULT_LOCALE, i18n, isMultipleLocales } from "#root/bot/i18n.js";
import { config } from "#root/config.js";
import type { Context } from "#root/bot/context.js";
import {
  BOT_ADMIN_COMMANDS,
  generateCommand,
  GROUP_COMMANDS,
  PRIVATE_CHAT_COMMANDS,
  SHARED_COMMANDS,
} from "#root/bot/helpers/index.js";

const sharedCommands = (localeCode: string) =>
  Object.values(SHARED_COMMANDS).map((command) =>
    generateCommand(command, localeCode),
  );

const privateChatCommands = (localeCode: string) =>
  Object.values(PRIVATE_CHAT_COMMANDS).map((command) =>
    generateCommand(command, localeCode),
  );

function getLanguageCommand(localeCode: string = DEFAULT_LOCALE): BotCommand {
  return generateCommand(SHARED_COMMANDS.LANGUAGE, localeCode);
}

export function getPrivateChatCommands(
  localeCode: string = DEFAULT_LOCALE,
): BotCommand[] {
  return [...sharedCommands(localeCode), ...privateChatCommands(localeCode)];
}

function getPrivateChatAdminCommands(
  localeCode: string = DEFAULT_LOCALE,
): BotCommand[] {
  return [generateCommand(BOT_ADMIN_COMMANDS.SET_COMMANDS, localeCode)];
}

export function getGroupChatCommands(
  localeCode: string = DEFAULT_LOCALE,
): BotCommand[] {
  return [
    ...sharedCommands(localeCode),
    generateCommand(GROUP_COMMANDS.SET_TOPIC, localeCode),
  ];
}

export async function setCommandsHandler(ctx: CommandContext<Context>) {
  // set private chat commands
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands(DEFAULT_LOCALE),
      ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LOCALE)] : []),
    ],
    {
      scope: {
        type: "all_private_chats",
      },
    },
  );

  if (isMultipleLocales) {
    const requests = i18n.locales.map((code) =>
      ctx.api.setMyCommands(
        [
          ...getPrivateChatCommands(code),
          ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LOCALE)] : []),
        ],
        {
          language_code: code,
          scope: {
            type: "all_private_chats",
          },
        },
      ),
    );

    await Promise.all(requests);
  }

  // set group chat commands
  await ctx.api.setMyCommands(getGroupChatCommands(DEFAULT_LOCALE), {
    scope: {
      type: "all_group_chats",
    },
  });

  if (isMultipleLocales) {
    const requests = i18n.locales.map((code) =>
      ctx.api.setMyCommands(getGroupChatCommands(code), {
        language_code: code,
        scope: {
          type: "all_group_chats",
        },
      }),
    );

    await Promise.all(requests);
  }

  // set private chat commands for owner
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands(DEFAULT_LOCALE),
      ...getPrivateChatAdminCommands(DEFAULT_LOCALE),
      ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LOCALE)] : []),
    ],
    {
      scope: {
        type: "chat",
        chat_id: Number(config.BOT_ADMIN_USER_ID),
      },
    },
  );

  return ctx.reply(ctx.t("commands.updated"));
}
