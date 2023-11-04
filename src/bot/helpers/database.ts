import { ObjectId } from "mongodb";
import { database } from "#root/bot/database.js";
import { DEFAULT_LOCALE } from "#root/bot/i18n.js";

export type Group = {
  _id: number;
  groupName: string;
  language?: string;
  threadId?: number;
};

export const getGroup = async (_id: Group["_id"]) => {
  const databaseInstance = await database.getInstance();

  return databaseInstance
    .collection("groups")
    .findOne<Group>({ _id: _id as unknown as ObjectId });
};

export const getGroups = async () => {
  const databaseInstance = await database.getInstance();

  const groupsInDatabase = databaseInstance.collection<Group>("groups").find();

  return groupsInDatabase.toArray();
};

export const insertGroup = async ({
  _id,
  groupName,
  language,
  threadId,
}: Group) => {
  const databaseInstance = await database.getInstance();

  return databaseInstance.collection("groups").insertOne({
    _id: _id as unknown as ObjectId,
    groupName,
    language: language ?? DEFAULT_LOCALE,
    threadId,
  });
};

export const setTopic = async (_id: number, threadId?: number) => {
  const databaseInstance = await database.getInstance();

  return databaseInstance
    .collection("groups")
    .updateOne({ _id: _id as unknown as ObjectId }, { $set: { threadId } });
};

export const setGroupLanguage = async (_id: number, language: string) => {
  const databaseInstance = await database.getInstance();

  return databaseInstance
    .collection("groups")
    .updateOne({ _id: _id as unknown as ObjectId }, { $set: { language } });
};
