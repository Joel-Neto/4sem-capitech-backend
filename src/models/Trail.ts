import { Schema, model } from 'mongoose';

export const Trail = model(
  'Trail',
  new Schema({
    description: {
      type: String,
      required: false,
      default: null,
    },
    video_description: {
      type: String,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    references: {
      type: String,
      required: false,
      default: null,
    },
    subtitle: {
      type: String,
      required: false,
      default: null,
      unique: true,
    },
    video_title: {
      type: String,
      required: false,
      default: null,
    },
  })
);
