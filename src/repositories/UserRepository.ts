import { IUser } from '../models/IUser';
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
    const allUser = await createdCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    this.disconnectDB();
    const users: IUser[] = allUser.map((user) => {
      const newUser = {
        id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };
      return newUser;
    });
    return users;
  }

  public async findByObjectID(objectID: string): Promise<IUser | undefined> {
    const createdCollection = await this.connectToDatabase(this.collection);
    const user = await createdCollection.findOne(
      {
        _id: new ObjectId(objectID),
      },
      { projection: { password: 0 } },
    );
    this.disconnectDB();

    if (user === null) {
      return undefined;
    }
    const newUser: IUser = {
      id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
    return newUser;
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
