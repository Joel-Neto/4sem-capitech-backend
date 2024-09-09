import { Schema, SchemaType, model } from 'mongoose';
import { IUser } from '../Types/IUsers';

export const User = model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);
