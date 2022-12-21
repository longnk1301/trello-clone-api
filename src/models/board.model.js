import Joi from 'joi';
import { getDatabase } from '../config/mongodb.js';

const boardCollectionName = 'boards';

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const create = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDatabase()
      .collection(boardCollectionName)
      .insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = {
  create,
};
