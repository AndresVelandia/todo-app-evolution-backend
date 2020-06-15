import { Inject, Service } from 'typedi';
import { TASK_MODEL_KEY } from '../models';
import { ITaskCreateOrUpdateDTO } from '../interfaces';
import { Types } from 'mongoose';
import { LOGGER_KEY } from '../config/index';
import { ITask } from '../interfaces/ITask';
import UtilsService from './utils';

@Service()
export default class TasksService {
  constructor(
    @Inject(TASK_MODEL_KEY) private tasksModel: Models.TasksModel,
    private utilsService: UtilsService,
    @Inject(LOGGER_KEY) private logger,
  ) {}

  public async getTasks(filter: Partial<ITask>): Promise<Partial<ITask>[]> {
    try {
      return await this.tasksModel.find(filter);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getTaskById(taskId: string | Types.ObjectId): Promise<Partial<ITask>> {
    try {
      const foundTask = await this.tasksModel.findById(taskId);

      if (foundTask == null) {
        throw new Error(`Task with id ${taskId} doesn't exists.`);
      }

      return foundTask.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createTask(newTask: ITaskCreateOrUpdateDTO): Promise<Partial<ITask>> {
    try {
      const taskRecord = await this.tasksModel.create({ ...newTask });
      return taskRecord.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateTask(
    taskId: string | Types.ObjectId,
    newTaskFields: Partial<ITask>,
  ): Promise<Partial<ITask>> {
    try {
      this.utilsService.deleteNullFields(newTaskFields);

      const updatedTask = await this.tasksModel.findOneAndUpdate({ _id: taskId }, { ...newTaskFields }, { new: true });

      if (updatedTask == null) {
        throw new Error(`Task with id ${taskId} doesn't exists.`);
      }

      return updatedTask.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteTask(taskId: string | Types.ObjectId): Promise<Partial<ITask>> {
    try {
      const deletedTask = await this.tasksModel.findByIdAndDelete(taskId);
      return deletedTask.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
