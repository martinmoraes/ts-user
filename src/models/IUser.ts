import { ObjectId } from 'mongodb';

export interface IUser {
  name: string;
  price: number;
  category: string;
  id?: ObjectId;
}
