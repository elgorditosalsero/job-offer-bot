import type { JobOfferQuestionArguments } from "#root/bot/context.js";

export const ralQuestion = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.ralQuestion"));

  return conversation.waitFrom(from);
};
