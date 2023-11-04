import type { JobOfferQuestionArguments } from "#root/bot/context.js";

async function getCity(
  { conversation, ctx, from }: JobOfferQuestionArguments,
  citiesLength: number,
) {
  await ctx.reply(
    ctx.t(`jobOffer.${citiesLength > 0 ? "cityQuestion" : "citiesQuestion"}`),
  );
  const cityCtx = await conversation.waitFrom(from);

  return cityCtx.message?.text;
}

export const citiesQuestion = async (
  jobOfferQuestionArguments: JobOfferQuestionArguments,
) => {
  const cities: Array<string> = [];
  let shouldStop = false;

  while (!shouldStop) {
    // eslint-disable-next-line no-await-in-loop
    const city = await getCity(jobOfferQuestionArguments, cities.length);

    if (!city || city.toLowerCase() === "stop") {
      shouldStop = true;
      break;
    }

    if (city) cities.push(city);
  }

  return cities;
};
