import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import { IDefineCollection } from './IRepositories';

export default class DB {
  collections: IDefineCollection;
  client: mongoDB.MongoClient;

  constructor() {
    dotenv.config();
    this.collections = {};
    if (!process.env.DB_CONN_STRING) {
      throw new Error('DB_CONN_STRING not found');
    }
    this.client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  }

  async connectToDatabase(collection: string): Promise<mongoDB.Collection> {
    await this.client.connect();
    const db: mongoDB.Db = this.client.db(process.env.DB_NAME);
    const createdCollection: mongoDB.Collection = db.collection(collection);
    this.collections.definedCollection = createdCollection;

    return this.collections.definedCollection;
  }

  disconnectDB() {
    this.client.close();
  }
}
