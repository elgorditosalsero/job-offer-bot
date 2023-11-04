import { Db, MongoClient } from "mongodb";
import { config } from "#root/config.js";
import { logger } from "#root/logger.js";

class Database {
  private client: MongoClient;

  private instance: Db | undefined;

  constructor() {
    this.client = new MongoClient(config.MONGO_URL);
    this.init()
      .then(() => logger.debug("DB connected"))
      .catch(logger.error);
  }

  private async init() {
    await this.client.connect();

    this.instance = this.client.db(config.MONGO_DB);
  }

  async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    await this.client.connect();

    return this.client.db(config.MONGO_DB);
  }
}

const database = new Database();

export { database };
