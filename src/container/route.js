import {asFunction} from "awilix";
import {ClientRoute} from '../api/route/client';
import {AuthRoute} from '../api/route/auth';

const registerRoute = (container) => {
  container.register({
    ClientRouter: asFunction(({clientController}) => {
      return ClientRoute(clientController)
    }).singleton(),
    AuthRouter: asFunction(({authController}) => {
      return AuthRoute(authController)
    }).singleton(),
  });
}

export default registerRoute;