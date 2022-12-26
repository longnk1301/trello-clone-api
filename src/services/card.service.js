import { CardModel } from '../models/card.model.js';

const create = async (data) => {
  try {
    const result = await CardModel.create(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


const update = async (id, data) => {
  try {
    const newData = {
      ...data,
      updatedAt: Date.now()
    }
    const result = await CardModel.update(id, newData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = {
  create,
  update
};
