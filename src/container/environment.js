import { asValue } from 'awilix';
import dotenv from 'dotenv';

const envFound = dotenv.config()

if (envFound.error) {
  throw new Error("Couldn't find .env file")
}

const {
  SERVER_PORT,
  LOG_LEVEL,
  API_PREFIX,
  NODE_ENV,
} = process.env

const registerEnvironment = (container) => {
  container.register({
    appConfig: asValue({
      serverPort: parseInt(SERVER_PORT),
      logLevel: LOG_LEVEL,
      apiPrefix: API_PREFIX,
      nodeEnv: NODE_ENV,
    })
  })
}

export default registerEnvironment;