import {Router} from 'express';
import me from './me';

const usersRouter = Router();

export default function registerUsersRoute(router: Router) {
    router.use('/users', usersRouter);

    me(usersRouter);
}