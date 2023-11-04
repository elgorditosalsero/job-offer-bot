import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { isAdmin } from "grammy-guard";
import {
  getGroup,
  GROUP_COMMANDS,
  logHandle,
  setTopic,
} from "#root/bot/helpers/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType(["supergroup", "group"]).filter(isAdmin);

feature.command(
  GROUP_COMMANDS.SET_TOPIC,
  logHandle("set-topic"),
  async (ctx) => {
    const {
      chat: { id },
      message_thread_id: threadId,
    } = ctx.message;

    const isBotInit = await getGroup(id);

    if (isBotInit) {
      try {
        await setTopic(id, threadId);

        return ctx.reply(ctx.t("general.setTopic"), {
          message_thread_id: threadId,
        });
      } catch (error) {
        await ctx.reply(ctx.t("errors.general"), {
          message_thread_id: threadId,
        });
        throw error;
      }
    }

    return ctx.reply(ctx.t("general.botIsNotInit"), {
      message_thread_id: threadId,
    });
  },
);

export { composer as setTopicFeature };
