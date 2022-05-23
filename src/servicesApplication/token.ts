import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IIdUser } from 'src/models/IUser';

export class Token {
  generate(obj: IIdUser): string {
    if (!process.env.PRIVATEKEY) {
      throw new Error('PRIVATEKEY not found');
    }
    const token = jwt.sign(obj, process.env.PRIVATEKEY, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return 'Bearer ' + token;
  }

  verify(token: string) {
    if (!process.env.PRIVATEKEY) {
      throw new Error('PRIVATEKEY not found');
    }
    return jwt.verify(token, process.env.PRIVATEKEY);
  }

  decode(token: string) {
    return jwt.decode(token);
  }
}
