import type { Context } from "#root/bot/context.js";
import type { Group } from "#root/bot/helpers/database.js";
import { getGroup } from "#root/bot/helpers/database.js";

const sendJO = async (
  ctx: Context,
  groupId: number,
  threadId: number | undefined,
  jobOffer: string,
) => {
  const sentJO = await ctx.api.sendMessage(Number(groupId), jobOffer, {
    message_thread_id: threadId,
  });

  return ctx.api.pinChatMessage(groupId, sentJO.message_id);
};

export const sendJOToGroup = async (
  ctx: Context,
  generateJobOffer: (groupId: number) => Promise<string>,
  groupId: number,
  groups?: Array<Group> | undefined,
) => {
  const groupWhereToPost = groups
    ? groups.find((group) => group._id === groupId)
    : await getGroup(groupId);

  if (groupWhereToPost) {
    const { _id, threadId } = groupWhereToPost;
    const jobOffer = await generateJobOffer(_id);

    await sendJO(ctx, _id, threadId, jobOffer);

    return ctx.reply(ctx.t("jobOffer.sentToGroup"));
  }

  return ctx.reply(ctx.t("errors.groupMissing"));
};

export const sendJOToAllGroups = async (
  ctx: Context,
  generateJobOffer: (groupId: number) => Promise<string>,
  groups: Array<Group>,
) => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const group of groups) {
    const jobOffer = await generateJobOffer(group._id);
    await sendJO(ctx, group._id, group.threadId, jobOffer);
  }

  return ctx.reply(ctx.t("jobOffer.sentToAllGroup"));
};
