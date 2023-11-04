import type { Context } from "#root/bot/context.js";
import { InlineKeyboard } from "grammy";
import { getNoString, getYesString } from "#root/bot/helpers/index.js";
import { hasBenefitsData } from "#root/bot/callback-data/index.js";

export const createHasBenefitsMenu = (ctx: Context, activeAnswer?: string) => {
  const getLabel = (benefitText: string) => {
    const isActive = benefitText === activeAnswer;

    return `${isActive ? "✅ " : ""}${benefitText}`;
  };

  return new InlineKeyboard()
    .text(
      getLabel(getYesString(ctx)),
      hasBenefitsData.pack({ hasBenefits: getYesString(ctx) }),
    )
    .text(
      getLabel(getNoString(ctx)),
      hasBenefitsData.pack({ hasBenefits: getNoString(ctx) }),
    );
};
