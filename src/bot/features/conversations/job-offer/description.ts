import type { JobOfferQuestionArguments } from "#root/bot/context.js";

export const descriptionQuestion = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.descriptionQuestion"));

  return conversation.waitFrom(from);
};
