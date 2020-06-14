import { Router, Request, Response, NextFunction } from 'express';
import { Container as TypeDiContainer } from 'typedi';
import { Logger } from 'winston';
import { isAuth } from '../../middlewares';
import { LOGGER_KEY } from '../../../config';

const logoutHandler = (req: Request, res: Response, next: NextFunction) => {
  const logger: Logger = TypeDiContainer.get(LOGGER_KEY);
  logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
  try {
    //@TODO AuthService.Logout(req.user) do some clever stuff
    return res.status(200).end();
  } catch (e) {
    logger.error('🔥 error %o', e);
    return next(e);
  }
};

export default function registerLogoutRoute(authRouter: Router) {
  authRouter.post('/logout', isAuth, logoutHandler);
}
