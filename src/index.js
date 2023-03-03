import configureContainer from './container';
import mongoose from 'mongoose';
import {logger} from './logger';

const {NODE_ENV} = process.env;
const container = configureContainer();
const expressApp = container.cradle.express;
const httpPort = container.cradle.appConfig.serverPort;
const mongooseUrl = container.cradle.appConfig.dataBase.url;

mongoose.connect(mongooseUrl)
.then( () => {
  logger.info('database connected')
  expressApp.listen(httpPort, () => {
    logger.info(`Server starting on port '${httpPort}' in '${NODE_ENV}' configuration!`);
  });
})
  .catch((error) => {
    logger.error(`failed to lunch database due to ${error}`)
  });
