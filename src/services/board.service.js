import { BoardModel } from '../models/board.model.js';

const create = async (data) => {
  try {
    const result = await BoardModel.create(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = {
  create,
};
