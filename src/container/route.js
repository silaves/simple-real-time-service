import {asFunction} from "awilix";
import {ClientRoute} from '../api/route/client';
import {AuthRoute} from '../api/route/auth';
import {ItemRoute} from "../api/route/item";

const registerRoute = (container) => {
  container.register({
    ClientRouter: asFunction(({clientController}) => {
      return ClientRoute(clientController)
    }).singleton(),
    AuthRouter: asFunction(({authController}) => {
      return AuthRoute(authController)
    }).singleton(),
    ItemRouter: asFunction(({itemController}) => {
      return ItemRoute(itemController)
    }).singleton(),
  });
}

export default registerRoute;