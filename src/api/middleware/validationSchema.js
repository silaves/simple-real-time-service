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

export const ValidationSchemaMDW = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      logger.error(error);
      return res.status(400).json({message: "Invalid fields"});
    }
  }
}

export const Schemas = {
  userCreate: Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  item: Joi.object({
    name: Joi.string().required(),
  }),
  category: Joi.object({
    name: Joi.string().required(),
  }),
  clientCreate: Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string(),
    address: Joi.string(),
  }),
  productCreate: Joi.object({
    user: Joi.string().required(),
    item: Joi.string().required(),
    category: Joi.string().required(),
    name: Joi.string().required(),
    stock: Joi.number().required(),
  }),
}