import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IUserPassword } from 'src/models/IUser';
import UserRepository from '../../../../repositories/UserRepository';
import { CreateUserUseCase } from '../../../../useCase/CreateUserUseCase';
import { ListUserUseCase } from '../../../../useCase/ListUserUseCase';

export class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const users = await new ListUserUseCase(new UserRepository()).execute();

    console.log(users);

    return res.status(200).json(users);
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

    console.log(resutedUser);

    return res.status(200).json(resutedUser);
  }
}
