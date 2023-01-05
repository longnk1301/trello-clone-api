import { CardModel } from '../models/card.model.js';
import { ColumnModel } from '../models/column.model.js';

const create = async (data) => {
  try {
    const newCard = await CardModel.create(data);

    //update cardOrder Array in column collection
    await ColumnModel.pushCardOrder(
      newCard.columnId.toString(),
      newCard._id.toString()
    );

    return newCard;
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

    if(newData._id) delete newData._id

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
