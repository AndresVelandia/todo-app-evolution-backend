import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { IUser } from '../interfaces';
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { USER_MODEL_KEY } from '../models';
import { LOGGER_KEY } from '../config/index';

@EventSubscriber()
export default class UserSubscriber {
  /**
   * A great example of an event that you want to handle
   * save the last time a user signin, your boss will be pleased.
   *
   * Altough it works in this tiny toy API, please don't do this for a production product
   * just spamming insert/update to mongo will kill it eventualy
   *
   * Use another approach like emit events to a queue (rabbitmq/aws sqs),
   * then save the latest in Redis/Memcache or something similar
   */
  @On(events.user.signIn)
  public onUserSignIn({ _id }: Partial<IUser>) {
    const Logger: winston.Logger = Container.get(LOGGER_KEY);

    try {
      const UserModel: Model<IUser & Document> = Container.get(USER_MODEL_KEY);

      UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
  }
  @On(events.user.signUp)
  public onUserSignUp({ name, email, _id }: Partial<IUser>) {
    const Logger: winston.Logger = Container.get(LOGGER_KEY);

    try {
      /**
       * @TODO implement this
       */
      // Call the tracker tool so your investor knows that there is a new signup
      // and leave you alone for another hour.
      // TrackerService.track('user.signup', { email, _id })
      // Start your email sequence or whatever
      // MailService.startSequence('user.welcome', { email, name })
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);

      // Throw the error so the process dies (check src/app.ts)
      throw e;
    }
  }
}
