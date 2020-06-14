import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import { LOGGER_KEY } from '../../../config';
import TaskTagsService from '../../../services/taskTags';

const getTaskTagsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  try {
    const currentUserId = req.token._id;
    const taskTagsServiceInstance = TypeDiContainer.get(TaskTagsService);
    const foundTaskTags = await taskTagsServiceInstance.getTaskTags({created_by_user_id: currentUserId});
    return res.json(foundTaskTags).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerGetTaskTagsRoute(tasksRouter: Router) {
  tasksRouter.get('/', isAuth, getTaskTagsHandler);
}