import Joi from 'joi';
import { HttpStatusCode } from '../utilities/constants.js';

const create = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};


const update = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string(),
    columnOrder: Joi.array().items(Joi.string()),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message,
    });
  }
};

export const BoardValidation = {
  create,
  update
};
