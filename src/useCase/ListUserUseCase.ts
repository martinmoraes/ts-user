import { IUser } from 'src/models/IUser';
import { IUserRepositoryListAll } from 'src/repositories/interfaces/IUserRepositories';

export class ListUserUseCase {
  constructor(private userRepository: IUserRepositoryListAll) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.userRepository.listAll();
    const userWhithoutPassword: IUser[] = users.map((user) => {
      delete user.password;
      return user;
    });
    return userWhithoutPassword;
  }
}
