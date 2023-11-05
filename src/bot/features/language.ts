import { Composer } from "grammy";
import {
  changeGroupLanguageData,
  changeLanguageData,
} from "#root/bot/callback-data/index.js";
import type { Context } from "#root/bot/context.js";
import {
  getGroup,
  logHandle,
  setGroupLanguage,
  SHARED_COMMANDS,
} from "#root/bot/helpers/index.js";
import { i18n } from "#root/bot/i18n.js";
import { createChangeLanguageKeyboard } from "#root/bot/keyboards/index.js";
import { onlyAdmin } from "#root/bot/middlewares/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");
const groupFeature = composer.chatType(["supergroup", "group"]);

feature.command(
  SHARED_COMMANDS.LANGUAGE,
  logHandle("command-language"),
  async (ctx) => {
    return ctx.reply(ctx.t("language.select"), {
      reply_markup: await createChangeLanguageKeyboard(ctx),
    });
  },
);

feature.callbackQuery(
  changeLanguageData.filter(),
  logHandle("keyboard-language-select"),
  async (ctx) => {
    const { code: languageCode } = changeLanguageData.unpack(
      ctx.callbackQuery.data,
    );

    if (i18n.locales.includes(languageCode)) {
      await ctx.i18n.setLocale(languageCode);

      return ctx.editMessageText(ctx.t("language.changed"), {
        reply_markup: await createChangeLanguageKeyboard(ctx),
      });
    }
  },
);

groupFeature.command(
  SHARED_COMMANDS.LANGUAGE,
  logHandle("group-command-language"),
  onlyAdmin(),
  async (ctx) => {
    const group = await getGroup(ctx.message.chat.id);

    return ctx.reply(ctx.t("language.groupSelect"), {
      reply_markup: await createChangeLanguageKeyboard(
        ctx,
        group?.language,
        true,
      ),
      message_thread_id: ctx.message.message_thread_id,
    });
  },
);

groupFeature.callbackQuery(
  changeGroupLanguageData.filter(),
  logHandle("group-keyboard-language-select"),
  async (ctx) => {
    const { code: languageCode, groupId } = changeGroupLanguageData.unpack(
      ctx.callbackQuery.data,
    );

    if (i18n.locales.includes(languageCode)) {
      await setGroupLanguage(groupId, languageCode);

      return ctx.editMessageText(ctx.t("language.changed"), {
        reply_markup: await createChangeLanguageKeyboard(
          ctx,
          languageCode,
          true,
        ),
      });
    }
  },
);

export { composer as languageFeature };
