import type { Update, User, UserFromGetMe } from "@grammyjs/types";
import { Context as DefaultContext, SessionFlavor, type Api } from "grammy";
import type { AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import type { HydrateFlavor } from "@grammyjs/hydrate";
import type { I18nFlavor } from "@grammyjs/i18n";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";
import type { Logger } from "#root/logger.js";
import type { Conversation, ConversationFlavor } from "@grammyjs/conversations";

export type SessionData = {
  conversation: object;
  __language_code?: string;
  user: { groupId?: number };
};

type ExtendedContextFlavor = {
  logger: Logger;
};

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
      ExtendedContextFlavor &
      SessionFlavor<SessionData> &
      I18nFlavor &
      AutoChatActionFlavor &
      ConversationFlavor
  >
>;

export type JobOffer = {
  role?: string;
  description?: string;
  ral?: string;
  isRemote?: string;
  cities?: Array<string>;
  benefits?: Array<string>;
  link?: string;
  linkText?: string;
};

export type JobOfferConversation = Conversation<Context>;
export type JobOfferQuestionArguments = {
  conversation: JobOfferConversation;
  ctx: Context;
  from: User;
};

interface Dependencies {
  logger: Logger;
}

export function createContextConstructor({ logger }: Dependencies) {
  return class extends DefaultContext implements ExtendedContextFlavor {
    logger: Logger;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      this.logger = logger.child({
        update_id: this.update.update_id,
      });
    }
  } as unknown as new (update: Update, api: Api, me: UserFromGetMe) => Context;
}
