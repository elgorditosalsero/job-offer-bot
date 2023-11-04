import { createCallbackData } from "callback-data";

export const sendToGroupData = createCallbackData("sendToGroup", {
  groupId: Number,
});
