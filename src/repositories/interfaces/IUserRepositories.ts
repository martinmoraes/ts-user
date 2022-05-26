import { IUser, IUserUpdate } from 'src/models/IUser';

export interface IUserRepositoryListAll {
  listAll(): Promise<IUser[]>;
}

export interface IUserRepositoryFindByObjectId {
  findByObjectID(objectID: string): Promise<IUser | undefined>;
}
export interface IUserRepositoryCreate extends IUserRepositoryFindByObjectId {
  createUser(user: IUser): Promise<string>;
}
export interface IUserRepositoryUpdate extends IUserRepositoryFindByObjectId {
  upDateById(query: string, user: IUserUpdate): Promise<boolean>;
}
export interface IUserRepositoryDelete extends IUserRepositoryFindByObjectId {
  deleteById(id: string): Promise<boolean>;
}
