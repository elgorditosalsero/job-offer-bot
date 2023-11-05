import { Context } from "#root/bot/context.js";
import { guard, isAdmin } from "grammy-guard";

export const onlyAdmin = () =>
  guard<Context>(isAdmin, (ctx) =>
    ctx.reply(ctx.t("general.onlyAdmin"), {
      message_thread_id: ctx.message?.message_thread_id,
      reply_to_message_id: ctx.message?.message_id,
    }),
  );
