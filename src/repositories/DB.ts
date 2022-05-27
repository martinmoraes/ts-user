import * as mongoDB from 'mongodb';
// import * as dotenv from 'dotenv';
import 'dotenv/config';

export default class DB {
  client: mongoDB.MongoClient;

  constructor() {
    // dotenv.config();
    if (!process.env.DB_CONN_STRING) {
      throw new Error('DB_CONN_STRING not found');
    }
    this.client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  }

  public async connectToDatabase(
    collection: string,
  ): Promise<mongoDB.Collection> {
    await this.client.connect();
    const db: mongoDB.Db = this.client.db(process.env.DB_NAME);
    const createdCollection: mongoDB.Collection = db.collection(collection);
    return createdCollection;
  }

  public disconnectDB() {
    this.client.close();
  }
}
