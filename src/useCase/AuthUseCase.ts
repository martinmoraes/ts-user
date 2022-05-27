import { IAuth, IIdUser, IUserToken } from '../models/IUser';
import { IUserRepositoryAuth } from 'src/repositories/interfaces/IUserRepositories';
import BcryptHashService from '../servicesApplication/BcryptHashService';
import { Token } from '../servicesApplication/TokenService';

export class AuthUseCase {
  constructor(private userRepository: IUserRepositoryAuth) {}

  public async execute(auth: IAuth): Promise<IUserToken> {
    const receivedUser = await this.userRepository.findByEMail(auth.email);
    if (receivedUser === undefined) {
      throw new Error('User not exists');
    }
    const resultCompare = await new BcryptHashService().compareHash(
      auth.password,
      receivedUser.password,
    );
    if (!resultCompare) {
      throw new Error('email or password do not match');
    }

    if (!receivedUser.id) {
      throw new Error('user without id');
    }
    const access_token = new Token().generate({ id: receivedUser.id });
    const user = {
      id: receivedUser.id,
      first_name: receivedUser.first_name,
      last_name: receivedUser.last_name,
      email: receivedUser.email,
    };
    return { user, access_token };
  }
}
