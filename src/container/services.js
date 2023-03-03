import {asFunction} from 'awilix';
import {ClientService} from '../services/clientService';
import {AuthService} from '../services/authService';
import {ItemService} from "../services/itemService";

function registerServices (container) {
  container.register({
    clientService: asFunction(({appConfig}) => {
      return new ClientService(appConfig);
    }),
    authService: asFunction(({appConfig}) => {
      return new AuthService(appConfig);
    }),
    itemService: asFunction(({appConfig}) => {
      return new ItemService(appConfig);
    }),
  });
}

export default registerServices;