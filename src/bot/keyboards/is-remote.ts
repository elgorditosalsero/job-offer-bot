import type { Context } from "#root/bot/context.js";
import { InlineKeyboard } from "grammy";
import { getNoString, getYesString } from "#root/bot/helpers/index.js";
import { isRemoteData } from "#root/bot/callback-data/index.js";

export const createIsRemoteMenu = (ctx: Context, activeAnswer?: string) => {
  const getLabel = (remoteText: string) => {
    const isActive = remoteText === activeAnswer;

    return `${isActive ? "✅ " : ""}${remoteText}`;
  };

  return new InlineKeyboard()
    .text(
      getLabel(getYesString(ctx)),
      isRemoteData.pack({ isRemote: getYesString(ctx) }),
    )
    .text(
      getLabel(getNoString(ctx)),
      isRemoteData.pack({ isRemote: getNoString(ctx) }),
    );
};
