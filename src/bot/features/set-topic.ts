import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import { guard, isAdmin } from "grammy-guard";
import {
  getGroup,
  GROUP_COMMANDS,
  logHandle,
  setTopic,
} from "#root/bot/helpers/index.js";

const composer = new Composer<Context>();

const feature = composer.chatType(["supergroup", "group"]);

feature.command(
  GROUP_COMMANDS.SET_TOPIC,
  logHandle("set-topic"),
  guard<Context>(isAdmin, (ctx) =>
    ctx.reply(ctx.t("general.onlyAdmin"), {
      message_thread_id: ctx.message?.message_thread_id,
      reply_to_message_id: ctx.message?.message_id,
    }),
  ),
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
