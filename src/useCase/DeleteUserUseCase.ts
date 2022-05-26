import { IUserRepositoryDelete } from '../repositories/interfaces/IUserRepositories';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepositoryDelete) {}

  public async execute(userId: string): Promise<boolean> {
    return await this.userRepository.deleteById(userId);
  }
}
