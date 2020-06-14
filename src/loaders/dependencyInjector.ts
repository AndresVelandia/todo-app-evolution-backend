import { Container } from 'typedi';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import mailgun from 'mailgun-js';
import { IModel } from '../interfaces/IModel';
import config, { JOB_EXECUTOR_KEY, LOGGER_KEY, EMAIL_CLIENT_KEY } from '../config';

/***
 * dependencyInjector is a function that sets the instances of services
 * used all over the program in the dependency injector
 */
export const initDependencyInjector = ({ mongoConnection, models }: { mongoConnection; models: IModel<any>[] }) => {
  try {
    models.forEach(model => {
      Container.set(model.name, model.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set(JOB_EXECUTOR_KEY, agendaInstance);
    Container.set(LOGGER_KEY, LoggerInstance);
    Container.set(EMAIL_CLIENT_KEY, mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }));

    LoggerInstance.info('✌️ Agenda injected into container');

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
