import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle, SHARED_COMMANDS } from "#root/bot/helpers/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.on("message", logHandle("unhandled-message"), (ctx) => {
  return ctx.reply(
    ctx.t("general.unhandled", {
      command: SHARED_COMMANDS.COMMANDS,
    }),
  );
});

feature.on("callback_query", logHandle("unhandled-callback-query"), (ctx) => {
  return ctx.answerCallbackQuery();
});

export { composer as unhandledFeature };
