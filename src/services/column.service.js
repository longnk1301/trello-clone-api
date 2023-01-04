import { BoardModel } from '../models/board.model.js';
import { ColumnModel } from '../models/column.model.js';

const create = async (data) => {
  try {
    const newColumn = await ColumnModel.create(data);

    //update columnOrder Array in board collection
    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    );

    return newColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const newData = {
      ...data,
      updatedAt: Date.now(),
    };
    const result = await ColumnModel.update(id, newData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnService = {
  create,
  update,
};
