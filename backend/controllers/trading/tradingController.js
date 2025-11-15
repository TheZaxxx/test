import { placeBuyOrder, placeSellOrder } from '../../integrations/orderRouter.js';
import { Ledger } from '../../wallet-system/balanceLedger.js';
import fs from 'fs';

// Simulasi database order menggunakan file JSON
const HISTORY_FILE = 'orderHistory.json';

function saveOrderHistory(record) {
  const data = fs.existsSync(HISTORY_FILE)
    ? JSON.parse(fs.readFileSync(HISTORY_FILE))
    : [];
  data.push(record);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
}

export function apiPlaceBuy(req, res) {
  const { userId, orderId, price, amount } = req.body;

  placeBuyOrder(userId, orderId, price, amount);
  saveOrderHistory({ userId, orderId, side: 'buy', price, amount });

  res.json({ status: 'OK', message: 'Buy order placed' });
}

export function apiPlaceSell(req, res) {
  const { userId, orderId, price, amount } = req.body;

  placeSellOrder(userId, orderId, price, amount);
  saveOrderHistory({ userId, orderId, side: 'sell', price, amount });

  res.json({ status: 'OK', message: 'Sell order placed' });
}

export function apiGetBalance(req, res) {
  const { userId } = req.params;

  const usdt = Ledger.getBalance(userId, 'USDT');
  const btc = Ledger.getBalance(userId, 'BTC');

  res.json({ userId, balance: { USDT: usdt, BTC: btc } });
}

export function apiGetOrderHistory(req, res) {
  const { userId } = req.params;

  const data = fs.existsSync(HISTORY_FILE)
    ? JSON.parse(fs.readFileSync(HISTORY_FILE))
    : [];

  const userHistory = data.filter(h => h.userId === userId);

  res.json({ userId, history: userHistory });
}