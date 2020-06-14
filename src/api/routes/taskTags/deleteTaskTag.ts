import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import TaskTagsService from '../../../services/taskTags';
import { LOGGER_KEY } from '../../../config';

const deleteTaskTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  try {
    const taskId = req.params.taskId;
    const taskTagsServiceInstance = TypeDiContainer.get(TaskTagsService);
    const deletedTaskTag = await taskTagsServiceInstance.deleteTaskTag(taskId);
    return res.json(deletedTaskTag).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerdeleteTaskTagRoute(taskTagsRouter: Router) {
  taskTagsRouter.delete('/:taskTagId', isAuth, deleteTaskTagHandler);
}