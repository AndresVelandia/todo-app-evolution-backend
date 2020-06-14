import { Document, Model } from 'mongoose';
import { ITask, IUser, ITaskTag, ITaskPriority } from '../../interfaces';

declare global {
  namespace Express {
    export interface Request {
      token: any,
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type TasksModel = Model<ITask & Document>;
    export type TaskTagsModel = Model<ITaskTag & Document>;
    export type TaskPrioritiesModel = Model<ITaskPriority & Document>;
  }
}
