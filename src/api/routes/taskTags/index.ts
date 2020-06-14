import {Router} from 'express';
import createTaskTag from './createTaskTag';
import getTaskTagById from './getTaskTagById';
import getTaskTags from './getTaskTags';
import updateTaskTag from './updateTaskTag';
import deleteTaskTag from './deleteTaskTag';

const taskTagRouter = Router();

export default function registerTaskTagsRoute(router: Router) {
    router.use('/tags', taskTagRouter);

    getTaskTagById(taskTagRouter);
    getTaskTags(taskTagRouter);
    createTaskTag(taskTagRouter);
    updateTaskTag(taskTagRouter);
    deleteTaskTag(taskTagRouter);
}