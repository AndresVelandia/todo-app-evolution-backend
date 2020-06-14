import { ITask } from '../interfaces';
import {Schema, Document, Types, model} from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title can\'t be empty.'],
    },
    description: {
      type: String,
    },
    due_date: {
        type: Date,
    },
    tags_ids: {
        type: [Types.ObjectId]
    },
    priority_id: {
        type: Types.ObjectId
    },
    created_by_user_id: {
        type: Types.ObjectId
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export const MODEL_NAME = 'task';
export const MODEL = model<ITask & Document>(MODEL_NAME, taskSchema);
