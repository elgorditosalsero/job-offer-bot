import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import {
  GROUP_COMMANDS,
  logHandle,
  PRIVATE_CHAT_COMMANDS,
  SHARED_COMMANDS,
} from "#root/bot/helpers/index.js";

const composer = new Composer<Context>();

const privateFeature = composer.chatType("private");
const groupFeature = composer.chatType(["supergroup", "group"]);

privateFeature.command(
  SHARED_COMMANDS.HELP,
  logHandle("private-help"),
  async (ctx) => {
    await ctx.reply(
      ctx.t("help.private", {
        commands: SHARED_COMMANDS.COMMANDS,
        postCommand: SHARED_COMMANDS.POST_JOB_OFFER,
        postGroupsCommand: PRIVATE_CHAT_COMMANDS.POST_JOB_OFFER_TO_GROUPS,
      }),
    );
  },
);

groupFeature.command(
  SHARED_COMMANDS.HELP,
  logHandle("group-help"),
  async (ctx) => {
    await ctx.reply(
      ctx.t("help.group", {
        commands: SHARED_COMMANDS.COMMANDS,
        languageCommand: SHARED_COMMANDS.LANGUAGE,
        postCommand: SHARED_COMMANDS.POST_JOB_OFFER,
        topicCommand: GROUP_COMMANDS.SET_TOPIC,
        excludeCommand: GROUP_COMMANDS.EXCLUDE_FROM_CROSSPOSTING,
      }),
      {
        message_thread_id: ctx.message.message_thread_id,
      },
    );
  },
);

export { composer as helpFeature };
