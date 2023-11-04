import { InlineKeyboard } from "grammy";
import ISO6391 from "iso-639-1";
import {
  changeGroupLanguageData,
  changeLanguageData,
} from "#root/bot/callback-data/index.js";
import type { Context } from "#root/bot/context.js";
import { i18n } from "#root/bot/i18n.js";
import { chunk } from "#root/bot/helpers/index.js";

export const createChangeLanguageKeyboard = async (
  ctx: Context,
  groupLocale?: string,
  isForGroup = false,
) => {
  const currentLocaleCode = await ctx.i18n.getLocale();

  const getLabel = (code: string) => {
    const isActive =
      isForGroup && groupLocale
        ? code === groupLocale
        : code === currentLocaleCode;

    return `${isActive ? "✅ " : ""}${ISO6391.getNativeName(code)}`;
  };

  const callbackData = (code: string) =>
    isForGroup
      ? changeGroupLanguageData.pack({
          code,
          groupId: ctx.message?.chat.id ?? 0,
        })
      : changeLanguageData.pack({
          code,
        });

  return InlineKeyboard.from(
    chunk(
      i18n.locales.map((localeCode) => ({
        text: getLabel(localeCode),
        callback_data: callbackData(localeCode),
      })),
      2,
    ),
  );
};
