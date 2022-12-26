import express from 'express';
import { HttpStatusCode } from '../../utilities/constants.js';
import { BoardRoutes } from './board.route.js';
import { ColumnRoutes } from './column.route.js';
import { CardRoutes } from './card.route.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.status(HttpStatusCode.OK).json({ status: 'OK!' });
});

// Board API
router.use('/boards', BoardRoutes);

// Column API
router.use('/columns', ColumnRoutes);

// Card API
router.use('/cards', CardRoutes);

export const apiV1 = router;
