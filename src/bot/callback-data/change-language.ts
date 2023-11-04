import { createCallbackData } from "callback-data";

export const changeLanguageData = createCallbackData("language", {
  code: String,
});

export const changeGroupLanguageData = createCallbackData("groupLanguage", {
  code: String,
  groupId: Number,
});
