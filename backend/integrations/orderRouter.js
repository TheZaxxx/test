import { createOrder } from '../matching-engine/orderTypes.js';
import { MatchEngine } from '../matching-engine/matchEngine.js';
import { Ledger } from '../wallet-system/balanceLedger.js';

const engine = new MatchEngine();

export function placeBuyOrder(userId, orderId, price, amount) {
  const cost = price * amount;

  const balance = Ledger.getBalance(userId, 'USDT');

  if (balance < cost) {
    console.log('BUY GAGAL: saldo tidak cukup');
    return;
  }

  Ledger.subtractBalance(userId, 'USDT', cost);

  engine.placeOrder(createOrder({
    id: orderId,
    userId,
    side: 'buy',
    price,
    amount
  }));
}

export function placeSellOrder(userId, orderId, price, amount) {
  const balance = Ledger.getBalance(userId, 'BTC');

  if (balance < amount) {
    console.log('SELL GAGAL: aset kurang');
    return;
  }

  Ledger.subtractBalance(userId, 'BTC', amount);

  engine.placeOrder(createOrder({
    id: orderId,
    userId,
    side: 'sell',
    price,
    amount
  }));
}