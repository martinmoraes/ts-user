import { IUser, IUserUpdate } from '../models/IUser';
import { IUserRepositoryUpdate } from '../repositories/interfaces/IUserRepositories';
import BcryptHashService from '../servicesApplication/BcryptHashService';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepositoryUpdate) {}

  public async execute(
    id: string,
    user: IUserUpdate,
  ): Promise<IUser | undefined> {
    if (user.password) {
      user.password = await new BcryptHashService().generateHash(user.password);
    }
    const resultedUpdate = await this.userRepository.upDateById(id, user);
    if (!resultedUpdate) {
      return undefined;
    }

    const resultedUser = await this.userRepository.findByObjectID(id);
    return resultedUser;
  }
}
