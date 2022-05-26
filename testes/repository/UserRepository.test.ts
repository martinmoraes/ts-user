import { IUserPassword } from '../../src/models/IUser';
import UserRepository from '../../src/repositories/UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should register a user', async () => {
    const user: IUserPassword = {
      first_name: 'João',
      last_name: 'Silva',
      password: '1eqwd23423',
      email: 'joao@sfsdf.vf',
    };

    const createdUser = await userRepository.createUser(user);

    expect(createdUser).toEqual(expect.any(String));
  });

  it('should list all user', async () => {
    const createdUser = await userRepository.listAll();
    console.log(createdUser);

    expect(createdUser).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('should update user', async () => {
    const userCreate: IUserPassword = {
      first_name: 'João',
      last_name: 'Silva',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
    };

    const userUpdate: IUserPassword = {
      first_name: 'João',
      last_name: 'Todos',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
    };

    const idUser = await userRepository.createUser(userCreate);

    const upDatedUser = await userRepository.upDateById(idUser, userUpdate);

    const result = await userRepository.deleteById(idUser);

    expect(upDatedUser).toBeTruthy();
  });

  it('should delete user', async () => {
    const userCreate: IUserPassword = {
      first_name: 'João',
      last_name: 'Silva',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
    };

    const idUser = await userRepository.createUser(userCreate);

    const upDatedUser = await userRepository.deleteById(idUser);
    expect(upDatedUser).toBeTruthy();
  });

  it('should find user by objectID', async () => {
    const userCreate: IUserPassword = {
      first_name: 'João',
      last_name: 'Silva',
      password: '2342g33345',
      email: 'joão@wwrwer.vf',
    };

    const idUser = await userRepository.createUser(userCreate);

    const findedUser = await userRepository.findByObjectID(idUser);
    console.log(idUser, findedUser);

    const result = await userRepository.deleteById(idUser);

    expect(findedUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        first_name: 'João',
        last_name: 'Silva',
        email: 'joão@wwrwer.vf',
      }),
    );
  });

  it('should find user by email', async () => {
    const userCreate: IUserPassword = {
      first_name: 'João',
      last_name: 'Silva',
      password: '2342g33345BB',
      email: 'joão@wwrwer.vfr.br',
    };

    const idUser = await userRepository.createUser(userCreate);

    const findedUser = await userRepository.findByEMail(userCreate.email);
    console.log(idUser, findedUser);

    const result = await userRepository.deleteById(idUser);

    expect(findedUser).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        first_name: 'João',
        last_name: 'Silva',
        password: expect.any(String),
        email: 'joão@wwrwer.vfr.br',
      }),
    );
  });
});
