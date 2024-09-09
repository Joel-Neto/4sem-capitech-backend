import * as Yup from 'yup';
import { ObjectSchema, object } from 'yup';

export namespace UserSchema {
  export const create: ObjectSchema<any> = object().shape({
    name: Yup.string()
      .required('O nome é obrigatório')
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(50, 'O nome pode ter no máximo 50 caracteres'),
    email: Yup.string()
      .email('O email deve ser um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(20, 'A senha pode ter no máximo 20 caracteres'),
  });

  export const update: ObjectSchema<any> = object().shape({
    name: Yup.string()
      .notRequired()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(50, 'O nome pode ter no máximo 50 caracteres')
      .optional(),
    email: Yup.string()
      .email('O email deve ser um email válido')
      .notRequired()
      .optional(),
    password: Yup.string()
      .notRequired()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(20, 'A senha pode ter no máximo 20 caracteres')
      .optional(),
  });
}
