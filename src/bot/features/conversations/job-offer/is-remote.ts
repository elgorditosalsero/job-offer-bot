import type { JobOfferQuestionArguments } from "#root/bot/context.js";
import { createIsRemoteMenu } from "#root/bot/keyboards/index.js";
import { isRemoteData } from "#root/bot/callback-data/index.js";

export const isRemoteQuestion = async ({
  conversation,
  ctx,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.isRemoteQuestion"), {
    reply_markup: createIsRemoteMenu(ctx),
  });

  const isRemoteCtx = await conversation.waitForCallbackQuery(
    isRemoteData.filter(),
    {
      otherwise: (context) =>
        context.reply(ctx.t("jobOffer.isRemoteQuestion"), {
          reply_markup: createIsRemoteMenu(ctx),
        }),
    },
  );

  await isRemoteCtx.editMessageText(ctx.t("jobOffer.isRemoteQuestion"), {
    reply_markup: createIsRemoteMenu(
      ctx,
      isRemoteData.unpack(isRemoteCtx.callbackQuery.data).isRemote,
    ),
  });

  return isRemoteCtx;
};
