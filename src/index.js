import configureContainer from './container';
import {logger} from './logger';

const {NODE_ENV} = process.env;
const container = configureContainer();
const expressApp = container.cradle.express;
const httpPort = container.cradle.appConfig.serverPort;

const expressServer = expressApp.listen(httpPort, () => {
  logger.info(`Server starting on port '${httpPort}' in '${NODE_ENV}' configuration!`);
});
