import { IUser } from '../interfaces';
import {Schema, Document, model} from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} },
);

export const MODEL_NAME = 'user';
export const MODEL = model<IUser & Document>(MODEL_NAME, userSchema);
