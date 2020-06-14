import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { ITaskPriority } from '../interfaces/ITaskPriority';
import { TASK_PRIORITY_MODEL_KEY } from '../models';
import { LOGGER_KEY } from '../config';

@Service()
export default class TaskPrioritiesService {
  constructor(
    @Inject(TASK_PRIORITY_MODEL_KEY) private taskPrioritiesModel: Models.TaskPrioritiesModel,
    @Inject(LOGGER_KEY) private logger: Logger,
  ) {}

  public async getTaskPriorities(filter: Partial<ITaskPriority>): Promise<Partial<ITaskPriority>[]> {
    try {
      return await this.taskPrioritiesModel.find(filter);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
