import Joi from 'joi';
import { getDatabase } from '../config/mongodb.js';
import { ObjectId } from 'mongodb';
import { ColumnModel } from './column.model.js'
import { CardModel } from './card.model.js'

const boardCollectionName = 'boards';

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDatabase()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) }, // condition
        { $push: { columnOrder: columnId } }, // set new data
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
      .collection(boardCollectionName)
      .insertOne(value);
    
    const result = await getDatabase()
    .collection(boardCollectionName)
    .findOne(response.insertedId)

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDatabase()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
          },
        },
        {
          $addFields: { _id: { $toString: '$_id' } }, //write title 1 field to find ObjectId of localField _id =>> ObjectId('abc') -> 'abc' 
        },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, //columns table
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns', //return a new property columns
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, //cards table
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards', //return a new property cards
          },
        },
      ])
      .toArray();

    return result[0] || [];
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = {
  create,
  getFullBoard,
  pushColumnOrder,
};
