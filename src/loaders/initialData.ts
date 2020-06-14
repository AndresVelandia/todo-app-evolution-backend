import { Container } from 'typedi';
import { TASK_PRIORITY_MODEL_KEY } from '../models';
import { Logger } from 'winston';
import { LOGGER_KEY } from '../config';

const taskPriorities = [
    {name: 'High', color: '#FA3427', description: 'The most important tasks'},
    {name: 'Medium', color: '#FCEF2E', description: 'Normal tasks'},
    {name: 'Low', color: '#4FA1FF', description: 'Tasks for the future'},
];

export default async () => {
    const logger: Logger = Container.get(LOGGER_KEY);
    const taskPrioritiesModel: Models.TaskPrioritiesModel = Container.get(TASK_PRIORITY_MODEL_KEY);

    for(const taskPriority of taskPriorities) {
         const foundTaskPriority = await taskPrioritiesModel.findOne({name: taskPriority.name});

         if (foundTaskPriority == null) {
             logger.info(`${taskPriority.name} priority was not found. Creating high priority info.`);
             const newTaskPriority = await taskPrioritiesModel.create({...taskPriority});
             logger.info(`${taskPriority.name} priority created with id ${newTaskPriority._id.toString()}`);
         } else {
             logger.info(`${taskPriority.name} priority was found. Skipping creation`);
         }
    }
}