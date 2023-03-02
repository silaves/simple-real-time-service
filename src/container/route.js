import {asFunction} from "awilix";
import {ClientRoute} from '../api/route/client'

const registerRoute = (container) => {
  container.register({
    ClientRouter: asFunction(({clientController}) => {
      return ClientRoute(clientController)
    }).singleton(),
  });
}

export default registerRoute;