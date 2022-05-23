import { IUser } from 'src/models/IUser';

export interface IUserRepositoryListAll {
  listAll: () => Promise<IUser[]>;
}
