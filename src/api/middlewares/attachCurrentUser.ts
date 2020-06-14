import { Container } from 'typedi';
import { Model, Document } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import winston from 'winston';
import { USER_MODEL_KEY } from '../../models';
import { LOGGER_KEY } from '../../config';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger: winston.Logger = Container.get(LOGGER_KEY);
  try {
    const UserModel: Model<IUser & Document> = Container.get(USER_MODEL_KEY);
    const userRecord = await UserModel.findById(req.token._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
