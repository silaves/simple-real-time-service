import {asFunction} from 'awilix';
import {ClientService} from '../services/clientService';
import {AuthService} from '../services/authService';

function registerServices (container) {
  container.register({
    clientService: asFunction(({appConfig}) => {
      return new ClientService(appConfig);
    }),
    authService: asFunction(({appConfig}) => {
      return new AuthService(appConfig);
    }),
  });
}

export default registerServices;