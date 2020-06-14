import { Router } from 'express';
import auth from './routes/auth';
import users from './routes/users';
import tasks from './routes/tasks';
import taskTags from './routes/taskTags';
import taskPriorities from './routes/taskPriorities';
import agendash from './routes/agendash';

export default function registerAllRoutes() {
	const app = Router();

	auth(app);
	users(app);
	tasks(app);
	taskTags(app);
	taskPriorities(app);
	agendash(app);

	return app;
}