import * as mongoDB from 'mongodb';

export interface DB {
  connectToDatabase(collection: string): Promise<mongoDB.Collection>;
  disconnectDB(): void;
}
