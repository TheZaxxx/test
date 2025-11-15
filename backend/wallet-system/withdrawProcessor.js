import walletEvents from './walletEventEmitter.js';
import { Ledger } from './balanceLedger.js';

walletEvents.on('withdraw_request', (data) => {
  const { userId, asset, amount } = data;

  const balance = Ledger.getBalance(userId, asset);
  if (balance < amount) {
    console.log('Withdraw FAILED: saldo kurang');
    return;
  }

  Ledger.subtractBalance(userId, asset, amount);
  console.log(`Withdraw QUEUED: ${amount} ${asset}`);
});