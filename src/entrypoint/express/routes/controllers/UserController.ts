import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IUser, IUserPassword, IUserUpdate } from 'src/models/IUser';
import { UpdateUserUseCase } from '../../../../useCase/UpdateUserUseCase';
import UserRepository from '../../../../repositories/UserRepository';
import { CreateUserUseCase } from '../../../../useCase/CreateUserUseCase';
import { ListUserUseCase } from '../../../../useCase/ListUserUseCase';
import { FindUserUseCase } from '../../../../useCase/FindUserUseCase';
import { DeleteUserUseCase } from '../../../../useCase/DeleteUserUseCase';

export class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    let users: IUser[];
    try {
      users = await new ListUserUseCase(new UserRepository()).execute();
    } catch (error) {
      return res.status(400).json({ message: 'unexpected error', error });
    }

    return res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user: IUserPassword = req.body;
    let resultedUser: IUser | undefined;
    try {
      resultedUser = await new CreateUserUseCase(new UserRepository()).execute(
        user,
      );
    } catch (error) {
      return res.status(400).json({ message: 'unexpected error', error });
    }

    if (resultedUser === undefined) {
      return res.status(400).json({});
    }

    return res.status(201).json(resultedUser);
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const user: IUserUpdate = req.body;
    let resultedUpdate;
    try {
      resultedUpdate = await new UpdateUserUseCase(
        new UserRepository(),
      ).execute(id, user);
    } catch (error) {
      return res.status(400).json({ message: 'unexpected error', error });
    }
    if (resultedUpdate === undefined) {
      return res.status(400).json({});
    }
    return res.status(201).json(resultedUpdate);
  }

  public async findUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    let resultedUpdate: IUser | undefined;
    try {
      resultedUpdate = await new FindUserUseCase(new UserRepository()).execute(
        id,
      );
    } catch (error) {
      return res.status(400).json({ message: 'unexpected error', error });
    }

    if (resultedUpdate === undefined) {
      return res.status(400).json({});
    }
    return res.status(201).json(resultedUpdate);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    let resultedDelete: boolean;
    try {
      resultedDelete = await new DeleteUserUseCase(
        new UserRepository(),
      ).execute(id);
    } catch (error) {
      return res.status(400).json({ message: 'unexpected error', error });
    }

    if (!resultedDelete) {
      return res.status(400).json({ deleted: resultedDelete });
    }
    return res.status(201).json({ deleted: resultedDelete });
  }
}
