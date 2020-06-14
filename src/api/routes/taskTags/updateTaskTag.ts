import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { isAuth } from '../../middlewares';
import { Logger } from 'winston';
import { celebrate, Joi } from 'celebrate';
import { LOGGER_KEY } from '../../../config';
import { ITaskTag } from '../../../interfaces/ITaskTag';
import TaskTagsService from '../../../services/taskTags';

export const dataValidationMiddleware = celebrate({
  body: Joi.object({
    name: Joi.string(),
    color: Joi.string(),
    description: Joi.string(),
  }),
});

const updateTaskTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  const taskTagId = req.params.taskTagId;
  const newTaskTagBody = req.body;

  const taskTagNewFields: Partial<ITaskTag> = {
    name: newTaskTagBody.name,
    color: newTaskTagBody.color,
    description: newTaskTagBody.description,
  };

  try {
    const taskTagsServiceInstance = TypeDiContainer.get(TaskTagsService);
    const updatedTaskTag = await taskTagsServiceInstance.updateTaskTag(taskTagId, taskTagNewFields);
    return res.json(updatedTaskTag).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerUpdateTaskTagRoute(taskTagsRouter: Router) {
  taskTagsRouter.put('/:taskTagId', isAuth, dataValidationMiddleware, updateTaskTagHandler);
  taskTagsRouter.patch('/:taskTagId', isAuth, dataValidationMiddleware, updateTaskTagHandler);
}
