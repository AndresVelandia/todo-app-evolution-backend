import { Model, Document } from 'mongoose';

export interface IModel<T> {
    name: string,
    model: Model<T & Document>
}