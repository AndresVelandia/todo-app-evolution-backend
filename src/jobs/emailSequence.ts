import { Container } from 'typedi';
import MailerService from '../services/mailer';
import winston from 'winston';
import { LOGGER_KEY } from '../config';

export default class EmailSequenceJob {
  public async handler(job, done): Promise<void> {
    const Logger: winston.Logger = Container.get(LOGGER_KEY);
    try {
      Logger.debug('✌️ Email Sequence Job triggered!');
      const { email, name }: { [key: string]: string } = job.attrs.data;
      const mailerServiceInstance = Container.get(MailerService);
      await mailerServiceInstance.SendWelcomeEmail(email);
      done();
    } catch (e) {
      Logger.error('🔥 Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}
