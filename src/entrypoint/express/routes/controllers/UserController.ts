import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IUserPassword, IUserUpdate } from 'src/models/IUser';
import { UpdateUserUseCase } from '../../../../useCase/UpdateUserUseCase';
import UserRepository from '../../../../repositories/UserRepository';
import { CreateUserUseCase } from '../../../../useCase/CreateUserUseCase';
import { ListUserUseCase } from '../../../../useCase/ListUserUseCase';
import { FindUserUseCase } from '../../../../useCase/FindUserUseCase';

export class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const users = await new ListUserUseCase(new UserRepository()).execute();

    return res.json(users);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user: IUserPassword = req.body;
    const resutedUser = await new CreateUserUseCase(
      new UserRepository(),
    ).execute(user);

    return res.status(201).json(resutedUser);
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const user: IUserUpdate = req.body;
    const resutedUpdate = await new UpdateUserUseCase(
      new UserRepository(),
    ).execute(id, user);

    if (resutedUpdate) {
      return res.status(201).json(resutedUpdate);
    }
    return res.status(400).json({});
  }

  public async findUser(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const resutedUpdate = await new FindUserUseCase(
      new UserRepository(),
    ).execute(id);

    if (resutedUpdate) {
      return res.status(201).json(resutedUpdate);
    }
    return res.status(400).json({});
  }
}
