import express from 'express';
import { HttpStatusCode } from '../../utilities/constants.js';
import { BoardRoutes } from './board.route.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.status(HttpStatusCode.OK).json({ status: 'OK!' });
});

// Board API
router.use('/boards', BoardRoutes);

export const apiV1 = router;
