import type { JobOfferQuestionArguments } from "#root/bot/context.js";
import {
  createHasBenefitsMenu,
  createIsRemoteMenu,
} from "#root/bot/keyboards/index.js";
import { hasBenefitsData } from "#root/bot/callback-data/index.js";
import { getNoString } from "#root/bot/helpers/index.js";

const getBenefit = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.benefitQuestion"));
  const benefitCtx = await conversation.waitFrom(from);

  return benefitCtx.message?.text;
};

export const benefitQuestion = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  const benefits: Array<string> = [];
  let shouldStop = false;

  await ctx.reply(ctx.t("jobOffer.benefitsQuestion"), {
    reply_markup: createHasBenefitsMenu(ctx),
  });

  const hasBenefitsCtx = await conversation.waitForCallbackQuery(
    hasBenefitsData.filter(),
    {
      otherwise: (context) =>
        context.reply(ctx.t("jobOffer.benefitsQuestion"), {
          reply_markup: createHasBenefitsMenu(ctx),
        }),
    },
  );

  await hasBenefitsCtx.editMessageText(ctx.t("jobOffer.benefitsQuestion"), {
    reply_markup: createIsRemoteMenu(
      ctx,
      hasBenefitsData.unpack(hasBenefitsCtx.callbackQuery.data).hasBenefits,
    ),
  });

  if (hasBenefitsCtx.match.includes(getNoString(ctx))) {
    return;
  }

  while (!shouldStop) {
    // eslint-disable-next-line no-await-in-loop
    const benefit = await getBenefit({ conversation, ctx, from });

    if (!benefit || benefit === "stop") {
      shouldStop = true;
      break;
    }

    if (benefit) benefits.push(benefit);
  }

  return benefits;
};
