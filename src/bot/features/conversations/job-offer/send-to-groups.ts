import type { JobOfferQuestionArguments } from "#root/bot/context.js";
import { sendToGroupMenu } from "#root/bot/keyboards/index.js";
import { sendToGroupData } from "#root/bot/callback-data/index.js";
import type { Group } from "#root/bot/helpers/index.js";

export const sendToGroupsQuestion = async (
  { conversation, ctx }: JobOfferQuestionArguments,
  groups: Array<Group>,
) => {
  await ctx.reply(ctx.t("jobOffer.sendToWhichGroup"), {
    reply_markup: sendToGroupMenu(ctx, groups),
  });

  return conversation.waitForCallbackQuery(sendToGroupData.filter(), {
    otherwise: (ctx1) =>
      ctx1.reply(ctx.t("jobOffer.sendToWhichGroup"), {
        reply_markup: sendToGroupMenu(ctx, groups),
      }),
  });
};
