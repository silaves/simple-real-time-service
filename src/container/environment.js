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
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_URL,
  JWT_SYMMETRIC_SECRET,
  JWT_EXPIRATION_TIME,
  JWT_ALGORITHM,
  JWT_ISSUER,
  JWT_AUDIENCE,
  APP_SIMPLE_HOST,
} = process.env

const registerEnvironment = (container) => {
  container.register({
    appConfig: asValue({
      serverPort: parseInt(SERVER_PORT),
      logLevel: LOG_LEVEL,
      apiPrefix: API_PREFIX,
      nodeEnv: NODE_ENV,
      appSimpleHost: APP_SIMPLE_HOST,
      dataBase: {
        user: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
      },
      jwt: {
        secret: JWT_SYMMETRIC_SECRET,
        expiration: JWT_EXPIRATION_TIME,
        algorithm: JWT_ALGORITHM,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      }
    })
  })
}

export default registerEnvironment;