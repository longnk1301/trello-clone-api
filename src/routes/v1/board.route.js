import express from 'express';
import { BoardController } from '../../controllers/board.controller.js';
import { BoardValidation } from '../../validations/board.validation.js';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {})
  .post(BoardValidation.create, BoardController.create);

export const BoardRoutes = router;
