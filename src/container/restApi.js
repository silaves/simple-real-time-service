import express, {Router} from 'express';
import helmet from 'helmet';
import {asFunction} from 'awilix';
import {ClientController} from '../api/controllers/clientController';

function registerRestApi (container) {
  container.register({
    clientController: asFunction(({clientService}) => {
      return new ClientController(clientService);
    }),
    router: asFunction(({
      ClientRouter,
    }) => {
      const router = Router();
      router.use(express.json());
      router.use('/client', ClientRouter);
      return router;
    }),
    express: asFunction(({router, appConfig}) => {
      const app = express();
      app.use(helmet());
      app.use(appConfig.apiPrefix, router);
      return app;
    }),
  });
}

export default registerRestApi;