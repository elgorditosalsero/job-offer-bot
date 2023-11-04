import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import {
  logHandle,
  PRIVATE_CHAT_COMMANDS,
  SHARED_COMMANDS,
} from "#root/bot/helpers/index.js";
import { postJobOfferFromGroupMenu } from "#root/bot/keyboards/index.js";
import { postJobOfferFromGroupData } from "#root/bot/callback-data/index.js";
import { config } from "#root/config.js";

const composer = new Composer<Context>();

const privateFeature = composer.chatType("private");
const groupFeature = composer.chatType(["supergroup", "group"]);

privateFeature.command(
  SHARED_COMMANDS.POST_JOB_OFFER,
  logHandle("post-job-offer"),
  async (ctx) => {
    await ctx.conversation.enter("jobOfferConversation");
  },
);

privateFeature.command(
  PRIVATE_CHAT_COMMANDS.POST_JOB_OFFER_TO_GROUPS,
  logHandle("post-job-offer-to-groups"),
  async (ctx) => {
    ctx.session.user.groupId = undefined;
    await ctx.conversation.enter("jobOfferConversation");
  },
);

groupFeature.command(
  SHARED_COMMANDS.POST_JOB_OFFER,
  logHandle("post-job-offer"),
  async (ctx) => {
    await ctx.reply(ctx.t("general.contactBot"), {
      message_thread_id: ctx.message.message_thread_id,
      reply_markup: postJobOfferFromGroupMenu(ctx, ctx.message.chat.id),
      reply_to_message_id: ctx.msg.message_id,
    });
  },
);

groupFeature.callbackQuery(postJobOfferFromGroupData.filter(), async (ctx) => {
  const { groupId } = postJobOfferFromGroupData.unpack(ctx.callbackQuery.data);

  await ctx.answerCallbackQuery({
    url: `${config.DEEPLINK}?start=${groupId}`,
  });
});

export { composer as postJobOfferFeature };
