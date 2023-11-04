import type { JobOfferQuestionArguments } from "#root/bot/context.js";

const linkRegex =
  /https?:\/\/(www\.)?[\w#%+.:=@~-]{1,256}\.[\d()A-Za-z]{1,6}\b([\w#%&()+./:=?@~-]*)/;

const isLink = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.linkQuestion"));
  const linkCtx = await conversation.waitFrom(from);

  return linkCtx.message?.text && linkRegex.test(linkCtx.message?.text)
    ? linkCtx.message.text
    : false;
};

export const linkQuestion = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  let link: string | undefined;

  do {
    // eslint-disable-next-line no-await-in-loop
    const isValidLink = await isLink({ conversation, ctx, from });

    if (isValidLink !== false) {
      link = isValidLink;
    }
  } while (link === undefined);

  return link;
};

export const linkTextQuestion = async ({
  conversation,
  ctx,
  from,
}: JobOfferQuestionArguments) => {
  await ctx.reply(ctx.t("jobOffer.linkTextQuestion"));

  return conversation.waitFrom(from);
};
