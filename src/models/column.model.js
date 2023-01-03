import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/mongodb.js';

const columnCollectionName = 'columns';

const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDatabase()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) }, // condition
        { $push: { cardOrder: cardId } }, // set new data
        { returnDocument: 'after' } // return record after updated
      );

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (data) => {
  try {
    const value = await validateSchema(data);
    const response = await getDatabase()
      .collection(columnCollectionName)
      .insertOne(value);

    const result = await getDatabase()
      .collection(columnCollectionName)
      .findOne(response.insertedId)

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    
    const result = await getDatabase()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) }, // condition
        { $set: data}, // set new data
        { returnDocument: 'after' } // return record after updated
      );

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  columnCollectionName,
  create,
  update,
  pushCardOrder,
};
