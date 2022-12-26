import { CardService } from '../services/card.service.js';
import { HttpStatusCode } from '../utilities/constants.js';

const create = async (req, res) => {
  try {
    const result = await CardService.create(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params
    const result = await CardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const CardController = {
  create,
  update,
};
