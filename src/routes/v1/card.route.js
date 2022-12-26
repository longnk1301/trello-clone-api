import express from 'express';
import { CardController } from '../../controllers/card.controller.js';
import { CardValidation } from '../../validations/card.validation.js';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {})
  .post(CardValidation.create, CardController.create);

router
  .route('/:id')
  .put(CardValidation.update, CardController.update);

export const CardRoutes = router;
