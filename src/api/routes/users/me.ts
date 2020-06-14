import { Router, Request, Response } from 'express';
import { isAuth, attachCurrentUser } from '../../middlewares';

const MeHandler = (req: Request, res: Response) => {
  return res.json({ user: req.currentUser }).status(200);
};

export default function registerMeRoute(usersRouter: Router) {
  usersRouter.post('/me', isAuth, attachCurrentUser, MeHandler);
}
