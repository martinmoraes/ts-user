import { Request, Response } from 'express';
import { IAuth, IUserToken } from 'src/models/IUser';
import { AuthUseCase } from '../../../../useCase/AuthUseCase';
import UserRepository from '../../../../repositories/UserRepository';

export class AuthController {
  public async auth(req: Request, res: Response): Promise<Response> {
    const auth: IAuth = req.body;
    let userToken: IUserToken;
    try {
      userToken = await new AuthUseCase(new UserRepository()).execute(auth);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: 'unexpected error', error });
    }

    return res.json(userToken);
  }
}
