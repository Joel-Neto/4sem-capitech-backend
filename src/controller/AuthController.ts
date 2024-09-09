import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import SendResponse from '../utils/SendResponse';
import { IUser } from '../Types/IUsers';

dotenv.config();

export class AuthController {
  validateToken(req: Request, res: Response) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return SendResponse.error(res, 401, 'Token não fornecido.');
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);

      SendResponse.success(res, 200, 'Token válido');
    } catch (error) {
      console.error('🚀 ~ AuthController ~ validateToken ~ error:', error);

      return SendResponse.error(res, 401, 'Token inválido ou expirado.');
    }
  }
}
