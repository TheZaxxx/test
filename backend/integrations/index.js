import './tradeSettlement.js';
import { placeBuyOrder, placeSellOrder } from './orderRouter.js';

console.log('Integration layer active');

// Contoh simulasi order dari user
placeBuyOrder('USER1', 'ORDER1', 100, 1);
placeSellOrder('USER2', 'ORDER2', 99, 1);