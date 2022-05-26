import { IUser, IUserPassword } from 'src/models/IUser';
import { IUserRepositoryCreate } from 'src/repositories/interfaces/IUserRepositories';
import BcryptHashService from '../servicesApplication/BcryptHashService';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepositoryCreate) {}

  public async execute(user: IUserPassword): Promise<IUser | undefined> {
    const receivedUser = await this.userRepository.findByEMail(user.email);
    if (receivedUser !== undefined) {
      throw new Error('User already exists');
    }
    user.password = await new BcryptHashService().generateHash(user.password);
    const idUser = await this.userRepository.createUser(user);
    const resultedUser = await this.userRepository.findByObjectID(idUser);
    return resultedUser;
  }
}
