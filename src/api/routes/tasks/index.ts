import {Router} from 'express';
import getTasks from './getTasks';
import getTaskById from './getTaskById';
import createTask from './createTask';
import updateTask from './updateTask';
import deleteTask from './deleteTask';

const tasksRouter = Router();

export default function registerTasksRoute(router: Router) {
    router.use('/tasks', tasksRouter);

    getTasks(tasksRouter);
    getTaskById(tasksRouter);
    createTask(tasksRouter);
    updateTask(tasksRouter);
    deleteTask(tasksRouter);
}