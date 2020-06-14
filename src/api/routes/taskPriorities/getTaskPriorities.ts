import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import { LOGGER_KEY } from '../../../config';
import TaskPrioritiesService from '../../../services/priorities';

const getTaskPrioritiesHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  try {
    const taskPrioritiesServiceInstance = TypeDiContainer.get(TaskPrioritiesService);
    const foundTaskPriorities = await taskPrioritiesServiceInstance.getTaskPriorities({});
    return res.json(foundTaskPriorities).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerGetTaskPrioritiesRoute(taskPrioritiesRouter: Router) {
  taskPrioritiesRouter.get('/', isAuth, getTaskPrioritiesHandler);
}