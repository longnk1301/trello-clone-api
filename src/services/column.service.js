import { ColumnModel } from '../models/column.model.js';

const create = async (data) => {
  try {
    const result = await ColumnModel.create(data);
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
    const result = await ColumnModel.update(id, newData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = {
  create,
  update
};
