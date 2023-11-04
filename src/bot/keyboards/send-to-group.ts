import { InlineKeyboard } from "grammy";
import { sendToGroupData } from "#root/bot/callback-data/index.js";
import { chunk } from "#root/bot/helpers/index.js";
import type { Group } from "#root/bot/helpers/index.js";
import type { Context } from "#root/bot/context.js";

export const sendToGroupMenu = (
  ctx: Context,
  groups: Array<Group>,
  activeGroup?: number,
) => {
  const getLabel = (groupName: string, groupId: number) => {
    const isActive = groupId === activeGroup;

    return `${isActive ? "✅ " : ""}${groupName}`;
  };

  const buttons = groups.map((group) =>
    InlineKeyboard.text(
      getLabel(group.groupName, group._id),
      sendToGroupData.pack({ groupId: group._id }),
    ),
  );

  const allButton = InlineKeyboard.text(
    `${activeGroup === -1 ? "✅ " : ""}${ctx.t("jobOffer.all")}`,
    sendToGroupData.pack({ groupId: -1 }),
  );

  return InlineKeyboard.from(chunk([allButton, ...buttons], 5));
};
