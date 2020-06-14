import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import {executeAllLoaders} from './loaders';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  /**
   * execute all tasks related to the start of the server
   * loads database, express routes, mongoose models, others
   */
  await executeAllLoaders({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
