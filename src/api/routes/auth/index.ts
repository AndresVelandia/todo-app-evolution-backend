import {Router} from 'express';
import signUp from './signUp';
import signIn from './signIn';
import logout from './logout';

const authRouter = Router();

export default function registerAuthRoute(router: Router) {
    router.use('/auth', authRouter);

    signUp(authRouter);
    signIn(authRouter);
    logout(authRouter);
}