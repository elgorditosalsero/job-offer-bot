import { chatAction } from "@grammyjs/auto-chat-action";
import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { isBotAdmin } from "#root/bot/filters/index.js";
import { setCommandsHandler } from "#root/bot/handlers/index.js";
import { BOT_ADMIN_COMMANDS, logHandle } from "#root/bot/helpers/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType("private").filter(isBotAdmin);

feature.command(
  BOT_ADMIN_COMMANDS.SET_COMMANDS,
  logHandle("command-setcommands"),
  chatAction("typing"),
  setCommandsHandler,
);

export { composer as botAdminFeature };
