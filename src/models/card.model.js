import Joi from 'joi';
import { getDatabase } from '../config/mongodb.js';

const cardCollectionName = 'cards';

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const create = async (data) => {
  try {
    const value = await validateSchema(data);
    const response = await getDatabase()
      .collection(cardCollectionName)
      .insertOne(value);

    const result = await getDatabase()
      .collection(cardCollectionName)
      .findOne(response.insertedId)

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = {
  cardCollectionName,
  create,
};
