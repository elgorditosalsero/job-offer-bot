import { createCallbackData } from "callback-data";

export const postJobOfferFromGroupData = createCallbackData(
  "postJobOfferFromGroup",
  {
    groupId: Number,
  },
);
