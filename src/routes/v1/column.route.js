import express from 'express';
import { ColumnController } from '../../controllers/column.controller.js';
import { ColumnValidation } from '../../validations/column.validation.js';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {})
  .post(ColumnValidation.create, ColumnController.create);

router
  .route('/:id')
  .put(ColumnValidation.update, ColumnController.update);

export const ColumnRoutes = router;
