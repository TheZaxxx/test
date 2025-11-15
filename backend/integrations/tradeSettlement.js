import matchEvents from '../matching-engine/matchEventEmitter.js';
import { Ledger } from '../wallet-system/balanceLedger.js';

// Event: setiap trade berhasil di matching engine
matchEvents.on('trade', (trade) => {
  const { price, amount, buyOrderId, sellOrderId } = trade;

  console.log('
--- TRADE SETTLEMENT START ---');

  // Simulasi data user dari order ID
  const buyer = 'USER_' + buyOrderId;
  const seller = 'USER_' + sellOrderId;

  const totalCost = price * amount;

  // Buyer membayar USDT
  Ledger.subtractBalance(buyer, 'USDT', totalCost);

  // Seller menerima USDT
  Ledger.addBalance(seller, 'USDT', totalCost);

  // Buyer menerima aset (misal BTC)
  Ledger.addBalance(buyer, 'BTC', amount);

  // Seller mengurangi aset
  Ledger.subtractBalance(seller, 'BTC', amount);

  console.log('Settlement selesai');
  console.log('--- TRADE SETTLEMENT END ---
');
});