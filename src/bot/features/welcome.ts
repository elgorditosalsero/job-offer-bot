import { Composer } from "grammy";
import type { Context } from "#root/bot/context.js";
import {
  logHandle,
  getGroup,
  insertGroup,
  SHARED_COMMANDS,
} from "#root/bot/helpers/index.js";
import { isAdmin } from "grammy-guard";

const composer = new Composer<Context>();

const privateFeature = composer.chatType("private");
const groupFeature = composer.chatType(["supergroup", "group"]).filter(isAdmin);

privateFeature.command(
  SHARED_COMMANDS.START,
  logHandle("command-start"),
  (ctx) => {
    if (ctx.message.text) {
      const [_, groupId] = ctx.message.text.split(" ");

      if (groupId) {
        ctx.session.user.groupId = Number(groupId);
        return ctx.reply(
          ctx.t("general.welcomeWithGroupId", {
            command: SHARED_COMMANDS.POST_JOB_OFFER,
          }),
        );
      }
    }

    return ctx.reply(ctx.t("general.welcome"));
  },
);

groupFeature.command(
  SHARED_COMMANDS.START,
  logHandle("command-start-group"),
  async (ctx) => {
    const isGroupInDB = await getGroup(ctx.message.chat.id);

    if (!isGroupInDB) {
      await insertGroup({
        _id: ctx.message.chat.id,
        groupName: ctx.message.chat.title,
        language: ctx.session.__language_code,
        threadId: ctx.message.message_thread_id,
      });
    }

    return ctx.reply(ctx.t("general.welcomeGroup"), {
      message_thread_id: ctx.message.message_thread_id,
    });
  },
);

export { composer as welcomeFeature };
