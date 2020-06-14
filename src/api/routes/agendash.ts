
import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import agendash from 'agendash';
import { Container } from 'typedi';
import config, { JOB_EXECUTOR_KEY } from '../../config';

export default (app: Router) => {
  const agendaInstance = Container.get(JOB_EXECUTOR_KEY);

  app.use('/dash', 
    basicAuth({
	  users: {
	    [config.agendash.user]: config.agendash.password,
	  },
	  challenge: true,
	}),
	agendash(agendaInstance)
  );
}



