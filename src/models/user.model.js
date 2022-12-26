import Joi from 'joi';
import { getDatabase } from '../config/mongodb.js';

const userCollectionName = 'users';

const userCollectionSchema = Joi.object({
  name: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string().default(null),
  isActive: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await userCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const create = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDatabase()
      .collection(userCollectionName)
      .insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const UserModel = {
  create,
};
