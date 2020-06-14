import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { ITaskCreateOrUpdateDTO } from '../../../interfaces';
import config from '../../../config';
import TasksService from '../../../services/tasks';
import { Logger } from 'winston';
import { celebrate, Joi } from 'celebrate';
import { LOGGER_KEY } from '../../../config/index';

const dataValidationMiddleware = celebrate({
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    due_date: Joi.string(),
    tags_ids: Joi.array().items(Joi.string()),
    priority_id: Joi.string(),
  }),
});

const updateTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  const taskId = req.params.taskId;
  const taskNewFieldsBody = req.body;

  const taskNewFields: Partial<ITaskCreateOrUpdateDTO> = {
    title: taskNewFieldsBody.title,
    description: taskNewFieldsBody.description,
    due_date: taskNewFieldsBody.due_date,
    tags_ids: taskNewFieldsBody.tags_ids,
    priority_id: taskNewFieldsBody.priority_id,
  };

  try {
    const tasksServiceInstance = TypeDiContainer.get(TasksService);
    const updatedTask = await tasksServiceInstance.updateTask(taskId, taskNewFields);
    return res.json(updatedTask).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerUpdateTaskRoute(tasksRouter: Router) {
  tasksRouter.put('/:taskId', isAuth, dataValidationMiddleware, updateTaskHandler);
  tasksRouter.patch('/:taskId', isAuth, dataValidationMiddleware, updateTaskHandler);
}
