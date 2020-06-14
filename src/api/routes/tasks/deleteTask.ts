import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import TasksService from '../../../services/tasks';
import { LOGGER_KEY } from '../../../config';

const deleteTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  try {
    const taskId = req.params.taskId;
    const tasksServiceInstance = TypeDiContainer.get(TasksService);
    const deletedTask = await tasksServiceInstance.deleteTask(taskId);
    return res.json(deletedTask).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerdeleteTaskRoute(tasksRouter: Router) {
  tasksRouter.delete('/:taskId', isAuth, deleteTaskHandler);
}