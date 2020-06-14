import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { Logger } from 'winston';
import AuthService from '../../../services/auth';
import { celebrate, Joi } from 'celebrate';
import { LOGGER_KEY } from '../../../config';

const dataValidationMiddleware = celebrate({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);
  logger.debug('Calling Sign-In endpoint with body: %o', req.body);
  try {
    const { email, password } = req.body;
    const authServiceInstance = TypeDiContainer.get(AuthService);
    const { user, token } = await authServiceInstance.SignIn(email, password);
    return res.json({ user, token }).status(200);
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
};

export default function registerSignInRoute(authRouter: Router) {
  authRouter.post('/signin', dataValidationMiddleware, signInHandler);
}
