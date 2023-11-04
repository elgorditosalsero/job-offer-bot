import { JobOfferQuestionArguments } from "#root/bot/context.js";

export const roleQuestion = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.roleQuestion"));

  return conversation.waitFrom(from);
};
