import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import TaskTagsService from '../../../services/taskTags';
import { LOGGER_KEY } from '../../../config';

const getTaskTagByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);
  const taskTagId = req.params.taskTagId;

  try {
    const taskTagsServiceInstance = TypeDiContainer.get(TaskTagsService);
    const foundTaskTag = await taskTagsServiceInstance.getTaskTagById(taskTagId);
    return res.json(foundTaskTag).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerGetTaskTagByIdRoute(tasksRouter: Router) {
  tasksRouter.get('/:taskTagId', isAuth, getTaskTagByIdHandler);
}