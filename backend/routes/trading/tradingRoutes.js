import express from 'express';
import {
  apiPlaceBuy,
  apiPlaceSell,
  apiGetBalance,
  apiGetOrderHistory
} from '../../controllers/trading/tradingController.js';

const router = express.Router();

router.post('/buy', apiPlaceBuy);
router.post('/sell', apiPlaceSell);
router.get('/balance/:userId', apiGetBalance);
router.get('/history/:userId', apiGetOrderHistory);

export default router;