import { IUser } from '../../src/models/IUser';
import UserRepository from '../../src/repositories/UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should register a user', async () => {
    const user: IUser = {
      first_name: 'João',
      last_name: 'Silva',
      password: '1eqwd23423',
      email: 'joao@sfsdf.vf',
    };

    const createdUser = await userRepository.createUser(user);

    expect(createdUser).toEqual(expect.any(Object));
  });

  it('should list all user', async () => {
    const createdUser = await userRepository.listAll();

    expect(createdUser).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('should update user', async () => {
    const userCreate: IUser = {
      first_name: 'João',
      last_name: 'Silva',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
    };

    const userUpdate: IUser = {
      first_name: 'João',
      last_name: 'Todos',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
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
      first_name: 'João',
      last_name: 'Silva',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
    };

    const createdUser = await userRepository.createUser(userCreate);
    const id = createdUser.insertedId.toString();

    const upDatedUser = await userRepository.deleteById(id);

    expect(upDatedUser).toEqual(
      expect.objectContaining({ acknowledged: true, deletedCount: 1 }),
    );
  });
});
