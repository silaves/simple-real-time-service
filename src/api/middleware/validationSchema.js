import Joi from 'joi';
import {logger} from "../../logger";

export const ValidationSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);
    return true
  } catch (error) {
    logger.error(error);
    return false;
  }
}

export const Schemas = {
  userCreate: Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    profile: Joi.object({
      password: Joi.string().required(),
    }),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  clientCreate: {
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  },
}