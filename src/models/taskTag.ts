import { ITaskTag } from '../interfaces';
import {Schema, Document, Types, model} from 'mongoose';

const taskTagSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can\'t be empty'],
      index: true,
    },
    color: {
      type: String,
    },
    description: {
      type: String,
    },
    created_by_user_id: {
      type: Types.ObjectId
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const MODEL_NAME = 'task_tag';
export const MODEL = model<ITaskTag & Document>(MODEL_NAME, taskTagSchema);
