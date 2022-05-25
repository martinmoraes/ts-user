import { IUser } from 'src/models/IUser';
import { IUserRepositoryFindByObjectId } from 'src/repositories/interfaces/IUserRepositories';

export class FindUserUseCase {
  constructor(private userRepository: IUserRepositoryFindByObjectId) {}

  public async execute(id: string): Promise<IUser | undefined> {
    const resultedUser = await this.userRepository.findByObjectID(id);
    return resultedUser;
  }
}
