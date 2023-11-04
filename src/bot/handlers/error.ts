import { ErrorHandler } from "grammy";
import type { Context } from "#root/bot/context.js";
import { getUpdateInfo } from "#root/bot/helpers/index.js";

export const errorHandler: ErrorHandler<Context> = (error) => {
  const { ctx } = error;

  ctx.logger.error({
    err: error.error,
    update: getUpdateInfo(ctx),
  });
};
