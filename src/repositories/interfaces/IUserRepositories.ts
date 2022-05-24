import { IUser } from 'src/models/IUser';

export interface IUserRepositoryListAll {
  listAll(): Promise<IUser[]>;
}
export interface IUserRepositoryCreateUser {
  createUser(user: IUser): Promise<string>;
  findByObjectID(objectID: string): Promise<IUser | undefined>;
}
