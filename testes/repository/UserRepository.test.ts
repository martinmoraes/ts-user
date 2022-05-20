import { IUser } from 'models/IUser';
import UserRepository from '../../src/repositories/UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should register a user', async () => {
    const user: IUser = {
      name: 'João',
      price: 123,
      category: 'client',
    };

    const createdUser = await userRepository.createUser(user);
    console.log(createdUser);

    expect(createdUser).toEqual(expect.any(Object));
  });

  it('should list all user', async () => {
    const createdUser = await userRepository.listAll();
    console.log(createdUser);

    expect(createdUser).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('should update user', async () => {
    const userCreate: IUser = {
      name: 'João Silva',
      price: 456,
      category: 'client',
    };

    const userUpdate: IUser = {
      name: 'João',
      price: 123,
      category: 'client',
    };

    const createdUser = await userRepository.createUser(userCreate);
    const id = createdUser.insertedId.toString();

    const upDatedUser = await userRepository.upDateById(id, userUpdate);

    expect(upDatedUser).toEqual(
      expect.objectContaining({
        acknowledged: true,
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
      }),
    );
  });

  it('should delete user', async () => {
    const userCreate: IUser = {
      name: 'João Silva',
      price: 456,
      category: 'client',
    };

    const createdUser = await userRepository.createUser(userCreate);
    const id = createdUser.insertedId.toString();

    const upDatedUser = await userRepository.deleteById(id);

    expect(upDatedUser).toEqual(
      expect.objectContaining({ acknowledged: true, deletedCount: 1 }),
    );
  });
});
