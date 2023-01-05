import { BoardModel } from '../models/board.model.js';

const create = async (data) => {
  try {
    const result = await BoardModel.create(data);
    return result;
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

    if(newData._columns) delete newData._columns

    const result = await BoardModel.update(id, newData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};


const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.getFullBoard(id);

    if (!board || !board.columns) {
      throw new Error('Board not found!')
    }

    //add card to each column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    //sort columns by columnOrder, sort cards by cardOrder, but this step will pass to FE side to have good performance

    //remove cards from board
    delete board.cards

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = {
  create,
  update,
  getFullBoard,
};
