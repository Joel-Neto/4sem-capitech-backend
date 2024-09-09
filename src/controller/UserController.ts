import { Request, Response } from 'express';
import {
  AuthRegisterProps,
  AuthReqProps,
  UpdateUserProps,
} from '../Types/Requests/UserRequests';
import SendResponse from '../utils/SendResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { LimitAndPageProps } from '../Types/Requests/TrailRequests';

dotenv.config();

export class UserController {
  async auth(req: Request<unknown, unknown, AuthReqProps>, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne().where('email').equals(email);

      if (!user) {
        return SendResponse.error(res, 404, 'Usuário não encontrado');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return SendResponse.error(res, 400, 'Usuário ou senha incorreta');
      }
      const userObject = user.toObject();

      const { password: userPass, ...restUser } = userObject;

      const userToken = jwt.sign(restUser, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      return SendResponse.success(res, 200, 'Login realizado', userToken);
    } catch (error) {
      console.log('🚀 ~ UserController ~ auth ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao realizar login');
    }
  }

  async register(
    req: Request<unknown, unknown, AuthRegisterProps>,
    res: Response
  ) {
    try {
      const { adminCode, email, password, name } = req.body;

      if (!adminCode || !email || !password) {
        return SendResponse.error(
          res,
          404,
          'Campos obrigatórios não preenchidos'
        );
      }

      if (adminCode !== process.env.ADMIN_CODE) {
        return SendResponse.error(res, 400, 'Código de admin incorreto');
      }

      const userExists = await User.findOne().where('email').equals(email);

      if (userExists) {
        return SendResponse.error(res, 400, 'Usuário com e-mail já cadastrado');
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = { email, password: hashedPassword, name };

      const createdUser = await User.create(newUser);

      return SendResponse.success(
        res,
        201,
        'Usuário criado com sucesso',
        createdUser
      );
    } catch (error) {
      console.log('🚀 ~ UserController ~ auth ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao cadastrar usuário');
    }
  }

  async delete(req: Request<{ id: string }, unknown, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const userExists = await User.findOne().where('_id').equals(id);

      if (!userExists) {
        return SendResponse.error(res, 404, 'Usuário não encontrado');
      }

      await User.deleteOne().where('_id').equals(id);

      return SendResponse.success(res, 200, 'Usuário excluido com sucesso');
    } catch (error) {
      console.log('🚀 ~ UserController ~ delete ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao excluir usuário');
    }
  }

  async update(
    req: Request<{ id: string }, unknown, UpdateUserProps>,
    res: Response
  ) {
    try {
      const { id } = req.params;

      const data = req.body;

      const userExists = await User.findById(id);

      if (!userExists) {
        return SendResponse.error(res, 404, 'Usuário não encontrado');
      }

      let hashedPassword = null;
      let userUpdate = data;

      if (!data.password) {
        delete userUpdate.password;
      }

      if (data?.password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        hashedPassword = bcrypt.hashSync(data.password, salt);
        userUpdate.password = hashedPassword;
      }

      const user = await User.findByIdAndUpdate(id, userUpdate, { new: true });

      return SendResponse.success(
        res,
        200,
        'Dados do usuário atualizados com sucesso!',
        user
      );
    } catch (error) {
      console.log('🚀 ~ UserController ~ update ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao atualizar usuário');
    }
  }

  async getAll(
    req: Request<unknown, unknown, unknown, LimitAndPageProps>,
    res: Response
  ) {
    try {
      const limit = req.query.limit || 10;
      const skip = req.query.skip || 0;

      const users = await User.find().limit(limit).skip(skip);

      return SendResponse.success(
        res,
        200,
        'Sucesso ao listar usuários',
        users
      );
    } catch (error) {
      console.log('🚀 ~ UserController ~ error:', error);
      SendResponse.error(res, 500, 'Erro ao listar usuários');
    }
  }
}
