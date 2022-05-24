import { NextFunction, Request, Response } from 'express';
import { Token } from '../../servicesApplication/TokenService';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return loggerEndReturn(res);
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return loggerEndReturn(res);

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return loggerEndReturn(res);

  try {
    const decoded = new Token().verify(token);
    return next();
  } catch (error) {
    return loggerEndReturn(res);
  }
}

const loggerEndReturn = (res: Response) => {
  const mensage = 'Access token is missing or invalid';
  res.status(401).send(mensage);
  return;
};
