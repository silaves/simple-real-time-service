import express, {Router} from 'express';
import helmet from 'helmet';
import cors from "cors";
import {asFunction} from 'awilix';
import {ClientController} from '../api/controllers/clientController';
import {AuthController} from '../api/controllers/authController';
import {authorize} from '../api/middleware/authenticate';
import {ItemController} from "../api/controllers/itemController";
import {CategoryController} from "../api/controllers/categoryController";
import {ProductController} from "../api/controllers/productController";

function registerRestApi (container) {
  container.register({
    clientController: asFunction(({clientService, authService}) => {
      return new ClientController(clientService, authService);
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
    productController: asFunction(({productService}) => {
      return new ProductController(productService);
    }),
    authMiddleware: asFunction(({appConfig}) => {
      return authorize(appConfig);
    }),
    router: asFunction(({
      ClientRouter,
      AuthRouter,
      ItemRouter,
      CategoryRouter,
      ProductRouter,
      authMiddleware,
    }) => {
      const router = Router();
      router.use(express.json());
      router.use('/client', authMiddleware, ClientRouter);
      router.use('/item', authMiddleware, ItemRouter);
      router.use('/category', authMiddleware, CategoryRouter);
      router.use('/product', authMiddleware, ProductRouter);
      router.use('/auth', AuthRouter);
      return router;
    }),
    express: asFunction(({router, appConfig}) => {
      const app = express();
      app.use(helmet());
      app.use(cors({
        origin: 'http://localhost:5173'
      }));
      app.use(appConfig.apiPrefix, router);
      return app;
    }),
  });
}

export default registerRestApi;