import { Inject, Service } from 'typedi';
import { TASK_TAG_MODEL_KEY } from '../models';
import { Types } from 'mongoose';
import { LOGGER_KEY } from '../config/index';
import { ITaskTag } from '../interfaces';
import UtilsService from './utils';

@Service()
export default class TaskTagsService {
  constructor(
    @Inject(TASK_TAG_MODEL_KEY) private taskTagsModel: Models.TaskTagsModel,
    private utilsService: UtilsService,
    @Inject(LOGGER_KEY) private logger,
  ) {}

  public async getTaskTags(filter: Partial<ITaskTag>): Promise<Partial<ITaskTag>[]> {
    try {
      return await this.taskTagsModel.find(filter);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getTaskTagById(taskTagId: string | Types.ObjectId): Promise<Partial<ITaskTag>> {
    try {
      const foundTaskTag = await this.taskTagsModel.findById(taskTagId);

      if (foundTaskTag == null) {
        throw new Error(`Task tag with id ${taskTagId} doesn't exists.`);
      }

      return foundTaskTag.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async createTaskTag(newTaskTag: Partial<ITaskTag>): Promise<Partial<ITaskTag>> {
    try {
      delete newTaskTag._id;
      const taskRecord = await this.taskTagsModel.create({ ...newTaskTag });
      return taskRecord.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateTaskTag(
    taskTagId: string | Types.ObjectId,
    newTaskTagFields: Partial<ITaskTag>,
  ): Promise<Partial<ITaskTag>> {
    try {
      this.utilsService.deleteNullFields(newTaskTagFields);

      const updatedTaskTag = await this.taskTagsModel.findOneAndUpdate(
        { _id: taskTagId },
        { ...newTaskTagFields },
        { new: true },
      );
      return updatedTaskTag.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteTaskTag(taskTagId: string | Types.ObjectId): Promise<Partial<ITaskTag>> {
    try {
      const deletedTaskTag = await this.taskTagsModel.findByIdAndDelete(taskTagId);
      return deletedTaskTag.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
