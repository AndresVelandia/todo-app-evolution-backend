import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import TasksService from '../../../services/tasks';
import { LOGGER_KEY } from '../../../config';

const getTaskByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);
  const taskId = req.params.taskId;

  try {
    const tasksServiceInstance = TypeDiContainer.get(TasksService);
    const foundTask = await tasksServiceInstance.getTaskById(taskId);
    return res.json(foundTask).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerGetTaskByIdRoute(tasksRouter: Router) {
  tasksRouter.get('/:taskId', isAuth, getTaskByIdHandler);
}