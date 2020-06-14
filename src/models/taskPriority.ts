import { ITaskPriority } from '../interfaces';
import {Schema, Document, model} from 'mongoose';

const taskPrioritySchema = new Schema(
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
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const MODEL_NAME = 'task_priority';
export const MODEL = model<ITaskPriority & Document>(MODEL_NAME, taskPrioritySchema);
