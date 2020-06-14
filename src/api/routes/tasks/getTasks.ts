import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import TasksService from '../../../services/tasks';
import { LOGGER_KEY } from '../../../config';

const getTasksHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  try {
    const currentUserId = req.token._id;
    const tasksServiceInstance = TypeDiContainer.get(TasksService);
    const foundTasks = await tasksServiceInstance.getTasks({created_by_user_id: currentUserId});
    return res.json(foundTasks).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerGetTasksRoute(tasksRouter: Router) {
  tasksRouter.get('/', isAuth, getTasksHandler);
}