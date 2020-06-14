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
    name: Joi.string().required(),
    color: Joi.string().required(),
    description: Joi.string(),
  }),
});

const createTaskTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);

  const newTaskTagBody = req.body;
  const currentUserId = req.token._id;

  const newTaskTag: Partial<ITaskTag> = {
    name: newTaskTagBody.name,
    color: newTaskTagBody.color,
    description: newTaskTagBody.description,
    /**
     * This restricts notes creation to only authenticated users
     */
    created_by_user_id: currentUserId,
  };

  try {
    const taskTagsServiceInstance = TypeDiContainer.get(TaskTagsService);
    const createdTaskTag = await taskTagsServiceInstance.createTaskTag(newTaskTag);
    return res.json(createdTaskTag).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerCreateTaskTagRoute(taskTagsRouter: Router) {
  taskTagsRouter.post('/', isAuth, dataValidationMiddleware, createTaskTagHandler);
}
