import express, {Router} from 'express';
import helmet from 'helmet';
import {asFunction} from 'awilix';
import {ClientController} from '../api/controllers/clientController';
import {AuthController} from '../api/controllers/authController';
import {authorize} from '../api/middleware/authenticate';

function registerRestApi (container) {
  container.register({
    clientController: asFunction(({clientService}) => {
      return new ClientController(clientService);
    }),
    authController: asFunction(({authService, appConfig}) => {
      return new AuthController(authService, appConfig);
    }),
    authMiddleware: asFunction(({appConfig}) => {
      return authorize(appConfig);
    }),
    router: asFunction(({
      ClientRouter,
      AuthRouter,
      authMiddleware,
    }) => {
      const router = Router();
      router.use(express.json());
      router.use('/client', authMiddleware, ClientRouter);
      router.use('/auth', AuthRouter);
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