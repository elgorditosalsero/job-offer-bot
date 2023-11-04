import { InlineKeyboard } from "grammy";
import { postJobOfferFromGroupData } from "#root/bot/callback-data/index.js";
import type { Context } from "#root/bot/context.js";

export const postJobOfferFromGroupMenu = (ctx: Context, groupId?: number) =>
  new InlineKeyboard().text(
    ctx.t("general.bot"),
    postJobOfferFromGroupData.pack({
      groupId: groupId ?? 0,
    }),
  );
