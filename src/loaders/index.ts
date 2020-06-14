import mongooseLoader from './mongoose';
import {getModels} from '../models';
import { initDependencyInjector } from './dependencyInjector';
import createInitialData from './initialData';
import expressLoader from './express';


import jobsLoader from './jobs';
import Logger from './logger';

//We have to import at least all the events once so they can be triggered
import './events';

export const executeAllLoaders = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const models = getModels();

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await initDependencyInjector({
    mongoConnection,
    models,
  });
  Logger.info('✌️ Dependency Injector loaded');

  await createInitialData();
  Logger.info('✌️ Initial data configured');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
