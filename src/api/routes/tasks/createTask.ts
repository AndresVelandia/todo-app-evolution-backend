import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import { ITaskCreateOrUpdateDTO } from '../../../interfaces';
import TasksService from '../../../services/tasks';
import { celebrate, Joi } from 'celebrate';
import { LOGGER_KEY } from '../../../config';

export const dataValidationMiddleware = celebrate({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    due_date: Joi.string(),
    tags_ids: Joi.array().items(Joi.string()),
    priority_id: Joi.string(),
  }),
});

const createTaskHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  const newTaskBody = req.body;
  const currentUserId = req.token._id;

  const newTask: ITaskCreateOrUpdateDTO = {
    title: newTaskBody.title,
    description: newTaskBody.description,
    due_date: newTaskBody.due_date,
    tags_ids: newTaskBody.tags_ids,
    priority_id: newTaskBody.priority_id,
    /**
     * This restricts notes creation to only authenticated users
     */
    created_by_user_id: currentUserId,
  };

  try {
    const tasksServiceInstance = TypeDiContainer.get(TasksService);
    const createdTask = await tasksServiceInstance.createTask(newTask);
    return res.json(createdTask).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerCreateTaskRoute(tasksRouter: Router) {
  tasksRouter.post('/', isAuth, dataValidationMiddleware, createTaskHandler);
}
