import { IUser } from '../models/IUser';
import User from '../models/User';
import { ObjectId } from 'mongodb';
import DB from './DB';

export default class UserRepository extends DB {
  collection = 'users';

  public async createUser(user: IUser): Promise<string> {
    const createdCollection = await this.connectToDatabase(this.collection);
    const createdUser = await createdCollection.insertOne(user);
    this.disconnectDB();
    return createdUser.insertedId.toString();
  }

  public async listAll(): Promise<IUser[]> {
    const createdCollection = await this.connectToDatabase(this.collection);
    const allUser = await createdCollection.find({}).toArray();
    this.disconnectDB();
    const users: IUser[] = allUser.map((user) => {
      const newUser = new User(
        user._id.toString(),
        user.first_name,
        user.last_name,
        user.password,
        user.email,
      );
      return newUser;
    });
    return users;
  }

  public async upDateById(query: string, user: IUser): Promise<boolean> {
    const createdCollection = await this.connectToDatabase(this.collection);
    const updetedUser = await createdCollection.updateOne(
      { _id: new ObjectId(query) },
      { $set: user },
    );
    this.disconnectDB();
    return updetedUser.modifiedCount === 1 ? true : false;
  }

  public async deleteById(query: string): Promise<boolean> {
    const createdCollection = await this.connectToDatabase(this.collection);
    const updetedUser = await createdCollection.deleteOne({
      _id: new ObjectId(query),
    });
    this.disconnectDB();
    return updetedUser.deletedCount === 1 ? true : false;
  }
}
