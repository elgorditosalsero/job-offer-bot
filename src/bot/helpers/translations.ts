import type { Context } from "#root/bot/context.js";

export const getYesString = (ctx: Context) => ctx.t("general.yes");
export const getNoString = (ctx: Context) => ctx.t("general.no");
export const getNotDefinedString = (ctx: Context) =>
  ctx.t("general.notDefined");
