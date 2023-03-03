import express, {Router} from 'express';
import helmet from 'helmet';
import {asFunction} from 'awilix';
import {ClientController} from '../api/controllers/clientController';
import {AuthController} from '../api/controllers/authController';
import {authorize} from '../api/middleware/authenticate';
import {ItemController} from "../api/controllers/itemController";
import {CategoryController} from "../api/controllers/categoryController";

function registerRestApi (container) {
  container.register({
    clientController: asFunction(({clientService}) => {
      return new ClientController(clientService);
    }),
    authController: asFunction(({authService, appConfig}) => {
      return new AuthController(authService, appConfig);
    }),
    itemController: asFunction(({itemService}) => {
      return new ItemController(itemService);
    }),
    categoryController: asFunction(({categoryService}) => {
      return new CategoryController(categoryService);
    }),
    authMiddleware: asFunction(({appConfig}) => {
      return authorize(appConfig);
    }),
    router: asFunction(({
      ClientRouter,
      AuthRouter,
      ItemRouter,
      CategoryRouter,
      authMiddleware,
    }) => {
      const router = Router();
      router.use(express.json());
      router.use('/client', authMiddleware, ClientRouter);
      router.use('/item', authMiddleware, ItemRouter);
      router.use('/category', authMiddleware, CategoryRouter);
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