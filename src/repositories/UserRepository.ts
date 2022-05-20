import { IUser } from 'models/IUser';
import { ObjectId } from 'mongodb';
import DB from './DB';

export default class UserRepository extends DB {
  collection = 'users';

  async createUser(user: IUser) {
    const createdCollection = await this.connectToDatabase(this.collection);
    const createdUser = await createdCollection.insertOne(user);
    this.disconnectDB();
    return createdUser;
  }

  async listAll() {
    const createdCollection = await this.connectToDatabase(this.collection);
    const allUser = await createdCollection.find({}).toArray();
    this.disconnectDB();
    return allUser;
  }

  async upDateById(query: string, user: IUser) {
    const createdCollection = await this.connectToDatabase(this.collection);
    const updetedUser = await createdCollection.updateOne(
      { _id: new ObjectId(query) },
      { $set: user },
    );
    this.disconnectDB();
    return updetedUser;
  }

  async deleteById(query: string) {
    const createdCollection = await this.connectToDatabase(this.collection);
    const updetedUser = await createdCollection.deleteOne({
      _id: new ObjectId(query),
    });
    this.disconnectDB();
    return updetedUser;
  }
}
