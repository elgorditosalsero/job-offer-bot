import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { logHandle, SHARED_COMMANDS } from "#root/bot/helpers/index.js";
import {
  getGroupChatCommands,
  getPrivateChatCommands,
} from "#root/bot/handlers/index.js";

const generateCommandList = (commands: Array<string>) =>
  commands
    .map(
      (command) => `
 - /${command}`,
    )
    .join("");

const privateCommands = getPrivateChatCommands().map(({ command }) => command);
const groupCommands = getGroupChatCommands().map(({ command }) => command);

const composer = new Composer<Context>();

const privateChatFeature = composer.chatType("private");
const groupsChatCommands = composer.chatType(["supergroup", "group"]);

privateChatFeature.command(
  SHARED_COMMANDS.COMMANDS,
  logHandle("private-commands"),
  async (ctx) => {
    await ctx.reply(
      ctx.t("general.commands", {
        commands: generateCommandList(privateCommands),
      }),
    );
  },
);

groupsChatCommands.command(
  SHARED_COMMANDS.COMMANDS,
  logHandle("group-commands"),
  async (ctx) => {
    await ctx.reply(
      ctx.t("general.commands", {
        commands: generateCommandList(groupCommands),
      }),
      {
        message_thread_id: ctx.message.message_thread_id,
        reply_to_message_id: ctx.message.message_id,
      },
    );
  },
);

export { composer as commandsFeature };
