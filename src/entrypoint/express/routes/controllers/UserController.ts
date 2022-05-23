import { Request, Response } from 'express';
import UserRepository from '../../../../repositories/UserRepository';
import { ListUserUseCase } from '../../../../useCase/ListUserUseCase';

export class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const users = await new ListUserUseCase(new UserRepository()).execute();

    console.log(users);

    return res.status(200).json(users);
  }
}
