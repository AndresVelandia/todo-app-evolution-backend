import {Router} from 'express';
import getTaskPriorities from './getTaskPriorities';

const taskPrioritiesRouter = Router();

export default function registerTaskTagsRoute(router: Router) {
    router.use('/priorities', taskPrioritiesRouter);

    getTaskPriorities(taskPrioritiesRouter);
}