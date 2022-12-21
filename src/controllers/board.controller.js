import { BoardService } from '../services/board.service.js';
import { HttpStatusCode } from '../utilities/constants.js';

const create = async (req, res) => {
  try {
    const result = await BoardService.create(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const BoardController = {
  create,
};
