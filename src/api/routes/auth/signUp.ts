import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { Logger } from 'winston';
import config from '../../../config';
import AuthService from '../../../services/auth';
import { IUserInputDTO } from '../../../interfaces';
import { celebrate, Joi } from 'celebrate';
import { LOGGER_KEY } from '../../../config/index';

const dataValidationMiddleware = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const signUpHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);
  logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
  try {
    const authServiceInstance = TypeDiContainer.get(AuthService);
    const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
    return res.status(201).json({ user, token });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerSignUpRoute(authRouter: Router) {
  authRouter.post(
    '/signup',
    dataValidationMiddleware,
    signUpHandler,
  );
}
