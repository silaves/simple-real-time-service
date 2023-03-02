import {asFunction} from 'awilix';
import {ClientService} from '../services/clientService';

function registerServices (container) {
  container.register({
    clientService: asFunction(({appConfig}) => {
      return new ClientService(appConfig);
    }),
  });
}

export default registerServices;