import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import SendResponse from '../utils/SendResponse';

const secretKey = process.env.JWT_SECRET as string;

export function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return SendResponse.error(res, 401, 'Token inválido!');
    }

    const [isBearer, token] = authToken.split(' ');

    if (isBearer !== 'Bearer') {
      return SendResponse.error(res, 401, 'Token inválido!');
    }

    verify(token!, secretKey);
    return next();
  } catch (err: any) {
    return SendResponse.error(res, 401, 'Token inválido !');
  }
}
