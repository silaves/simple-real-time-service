import {asFunction} from 'awilix';
import {ClientService} from '../services/clientService';
import {AuthService} from '../services/authService';
import {ItemService} from "../services/itemService";
import {CategoryService} from "../services/categoryService";

function registerServices (container) {
  container.register({
    clientService: asFunction(() => {
      return new ClientService();
    }),
    authService: asFunction(({appConfig}) => {
      return new AuthService(appConfig);
    }),
    itemService: asFunction(({appConfig}) => {
      return new ItemService(appConfig);
    }),
    categoryService: asFunction(() => {
      return new CategoryService();
    }),
  });
}

export default registerServices;