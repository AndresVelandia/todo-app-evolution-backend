import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { LOGGER_KEY } from '../config';

@Service()
export default class UtilsService {
  constructor(@Inject(LOGGER_KEY) private logger: Logger) {}

  public deleteNullFields(object: any) {
    Object.keys(object).forEach(key => {
      if (object[key] == null) {
        delete object[key];
      }
    });
  }
}
