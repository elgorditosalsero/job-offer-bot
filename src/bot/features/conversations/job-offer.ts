import type {
  Context,
  JobOfferConversation,
  JobOfferQuestionArguments,
} from "#root/bot/context.js";
import {
  buildJobOffer,
  getYesString,
  getGroups,
  sendJOToGroup,
  sendJOToAllGroups,
} from "#root/bot/helpers/index.js";
import { sendToGroupMenu } from "#root/bot/keyboards/index.js";
import { sendToGroupData } from "#root/bot/callback-data/index.js";
import {
  benefitQuestion,
  citiesQuestion,
  descriptionQuestion,
  isRemoteQuestion,
  linkQuestion,
  linkTextQuestion,
  ralQuestion,
  roleQuestion,
  sendToGroupsQuestion,
} from "#root/bot/features/conversations/job-offer/index.js";

const jobOfferConversation = async (
  conversation: JobOfferConversation,
  ctx: Context,
) => {
  if (ctx.from === undefined) return;

  const jobOfferQuestionsArguments: JobOfferQuestionArguments = {
    conversation,
    ctx,
    from: ctx.from,
  };

  const roleCtx = await roleQuestion(jobOfferQuestionsArguments);
  const descriptionCtx = await descriptionQuestion(jobOfferQuestionsArguments);
  const ralCtx = await ralQuestion(jobOfferQuestionsArguments);

  const isRemoteCtx = await isRemoteQuestion(jobOfferQuestionsArguments);

  const cities = isRemoteCtx.match.includes(getYesString(ctx))
    ? undefined
    : await citiesQuestion(jobOfferQuestionsArguments);

  const benefits = await benefitQuestion(jobOfferQuestionsArguments);
  const link = await linkQuestion(jobOfferQuestionsArguments);
  const linkTextCtx = await linkTextQuestion(jobOfferQuestionsArguments);

  const generatedJobOffer = async (groupId: number) =>
    buildJobOffer(
      {
        role: roleCtx.message?.text,
        description: descriptionCtx.message?.text,
        ral: ralCtx.message?.text,
        isRemote: isRemoteCtx.match.includes(getYesString(ctx)),
        cities,
        benefits,
        link,
        linkText: linkTextCtx.message?.text,
      },
      ctx,
      groupId,
    );

  const { groupId } = ctx.session.user;

  /**
   * Posting the JO in the group from the session
   * The group is session is set when the users use the /postjoboffer command from the group
   */
  if (groupId) {
    return sendJOToGroup(ctx, generatedJobOffer, groupId);
  }

  // Posting the JO via group selection
  const groups = await getGroups();

  const groupsCtx = await sendToGroupsQuestion(
    jobOfferQuestionsArguments,
    groups,
  );

  await groupsCtx.editMessageText(ctx.t("jobOffer.sendToWhichGroup"), {
    reply_markup: sendToGroupMenu(
      ctx,
      groups,
      sendToGroupData.unpack(groupsCtx.callbackQuery.data).groupId,
    ),
  });

  // Posting the JO in all the groups when 'All' button is chosen
  if (groupsCtx.match.includes(String(-1))) {
    return sendJOToAllGroups(ctx, generatedJobOffer, groups);
  }

  return sendJOToGroup(
    ctx,
    generatedJobOffer,
    sendToGroupData.unpack(groupsCtx.callbackQuery.data).groupId,
    groups,
  );
};

export { jobOfferConversation };
