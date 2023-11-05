import { BotCommand } from "@grammyjs/types";
import { DEFAULT_LOCALE, i18n } from "#root/bot/i18n.js";

const BOT_ADMIN_COMMANDS = { SET_COMMANDS: "setcommands" } as const;

const GROUP_COMMANDS = {
  SET_TOPIC: "settopic",
  EXCLUDE_FROM_CROSSPOSTING: "excludefromcrossposting",
} as const;

const PRIVATE_CHAT_COMMANDS = {
  CANCEL_POST_JOB_OFFER: "cancelpostjoboffer",
  POST_JOB_OFFER_TO_GROUPS: "postjoboffertogroups",
} as const;

const SHARED_COMMANDS = {
  COMMANDS: "commands",
  HELP: "help",
  POST_JOB_OFFER: "postjoboffer",
  START: "start",
  LANGUAGE: "language",
} as const;

type BotAdminCommands =
  (typeof BOT_ADMIN_COMMANDS)[keyof typeof BOT_ADMIN_COMMANDS];

type GroupCommands = (typeof GROUP_COMMANDS)[keyof typeof GROUP_COMMANDS];

type PrivateChatCommands =
  (typeof PRIVATE_CHAT_COMMANDS)[keyof typeof PRIVATE_CHAT_COMMANDS];

type SharedCommands = (typeof SHARED_COMMANDS)[keyof typeof SHARED_COMMANDS];

type Commands =
  | BotAdminCommands
  | GroupCommands
  | PrivateChatCommands
  | SharedCommands;

const generateCommand = (
  command: Commands,
  localeCode: string = DEFAULT_LOCALE,
): BotCommand => ({
  command,
  description: i18n.t(localeCode, `commands.${command}`),
});

export {
  generateCommand,
  BOT_ADMIN_COMMANDS,
  GROUP_COMMANDS,
  PRIVATE_CHAT_COMMANDS,
  SHARED_COMMANDS,
};
export type { Commands, GroupCommands, PrivateChatCommands, SharedCommands };
