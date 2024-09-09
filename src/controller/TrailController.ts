import { Request, Response } from 'express';
import SendResponse from '../utils/SendResponse';
import { Trail } from '../models/Trail';
import {
  CreateAndUpdateTrailProps,
  LimitAndPageProps,
} from '../Types/Requests/TrailRequests';

export class TrailController {
  async getAll(
    req: Request<unknown, unknown, unknown, LimitAndPageProps>,
    res: Response
  ) {
    try {
      const limit = req.query.limit || 10;
      const skip = req.query.skip || 0;

      const trails = await Trail.find().limit(limit).skip(skip);

      SendResponse.success(res, 200, 'Sucesso ao listar trilhas', trails);
    } catch (error) {
      console.log('🚀 ~ TrailController ~ getAll ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao buscar trilhas');
    }
  }

  async getOne(req: Request<{ id: string }, unknown, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const trail = await Trail.findById(id);

      if (!trail) {
        return SendResponse.error(res, 404, 'Trilha não encontrada');
      }

      return SendResponse.success(
        res,
        200,
        'Trilha encontrada com sucesso',
        trail
      );
    } catch (error) {
      console.log('🚀 ~ TrailController ~ getOne ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao buscar trilha');
    }
  }

  async create(
    req: Request<unknown, unknown, CreateAndUpdateTrailProps>,
    res: Response
  ) {
    try {
      const data = req.body;

      const trailExists = await Trail.findOne()
        .where('subtitle')
        .equals(data.subtitle);

      if (trailExists) {
        return SendResponse.error(
          res,
          400,
          'Trilha com este subtítulo já cadastrada'
        );
      }

      const trail = await Trail.create(data);

      return SendResponse.success(res, 201, 'Trilha criada com sucesso', trail);
    } catch (error) {
      console.log('🚀 ~ TrailController ~ create ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao criar trilha');
    }
  }

  async update(
    req: Request<{ id: string }, unknown, CreateAndUpdateTrailProps>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const data = req.body;

      const trail = await Trail.findById(id);

      if (!trail) {
        return SendResponse.error(res, 404, 'Trilha não encontrada');
      }

      const updatedTrail = await Trail.findByIdAndUpdate(id, data, {
        new: true,
      });

      return SendResponse.success(res, 200, 'Trilha atualizada', updatedTrail);
    } catch (error) {
      console.log('🚀 ~ TrailController ~ update ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao atualizar trilha');
    }
  }

  async delete(req: Request<{ id: string }, unknown, unknown>, res: Response) {
    try {
      const { id } = req.params;

      const trail = await Trail.findById(id);

      if (!trail) {
        return SendResponse.error(res, 404, 'Trilha não encontrada');
      }

      await Trail.findByIdAndDelete(id, { new: true });

      return SendResponse.success(res, 200, 'Trilha excluída');
    } catch (error) {
      console.log('🚀 ~ TrailController ~ delete ~ error:', error);
      return SendResponse.error(res, 500, 'Erro ao excluir trilha');
    }
  }
}
