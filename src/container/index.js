import {createContainer, InjectionMode} from 'awilix';
import registerEnvironment from './environment';
import registerRoute from './route';
import registerServices from './services';
import registerRestApi from './restApi';

const configureContainer = () => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  registerEnvironment(container);
  registerServices(container);
  registerRestApi(container);
  registerRoute(container);
  return container;
};

export default configureContainer;