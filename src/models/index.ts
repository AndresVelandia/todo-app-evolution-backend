import { MODEL_NAME as userModelName, MODEL as userModel } from './user';
import { MODEL_NAME as taskModelName, MODEL as taskModel } from './task';
import { MODEL_NAME as taskPriorityModelName, MODEL as taskPriorityModel } from './taskPriority';
import { MODEL_NAME as taskTagModelName, MODEL as taskTagModel } from './taskTag';
import { IModel } from '../interfaces';

/**
 * Key for getting user model from dependency injection framework
 */
export const USER_MODEL_KEY = userModelName;
/**
 * Key for getting task model from dependency injection framework
 */
export const TASK_MODEL_KEY = taskModelName;
/**
 * Key for getting task priority from dependency injection framework
 */
export const TASK_PRIORITY_MODEL_KEY = taskPriorityModelName;
/**
 * Key for getting task tag from dependency injection framework
 */
export const TASK_TAG_MODEL_KEY = taskTagModelName;

/**
 * Gets all mongodb database models in order to inject them
 * into the dependency injection framework
 */
export function getModels(): IModel<any>[] {
  const models: IModel<any>[] = [];

  //user
  const user = {
    name: userModelName,
    model: userModel,
  };
  models.push(user);

  //task
  const task = {
    name: taskModelName,
    model: taskModel,
  };
  models.push(task);

  //task priority
  const taskPriority = {
    name: taskPriorityModelName,
    model: taskPriorityModel,
  };
  models.push(taskPriority);

  //task tag
  const taskTag = {
    name: taskTagModelName,
    model: taskTagModel,
  };
  models.push(taskTag);

  return models;
}
