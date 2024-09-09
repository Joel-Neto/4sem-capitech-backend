import { Schema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';
import SendResponse from '../utils/SendResponse';

class Validation {
  validate =
    (schema: Schema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { body } = req;
        await schema.validate(body);
        return next();
      } catch (error: any) {
        console.log(error);
        return SendResponse.error(
          res,
          500,
          `${(error as ValidationError).errors[0]}`
        );
      }
    };
}

export default Validation;
