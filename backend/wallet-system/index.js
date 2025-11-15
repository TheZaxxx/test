import { startDepositWatcher } from './depositWatcher.js';
import walletEvents from './walletEventEmitter.js';
import { Ledger } from './balanceLedger.js';

startDepositWatcher();

walletEvents.on('deposit_detected', (tx) => {
  const { userId, asset, amount } = tx;
  Ledger.addBalance(userId, asset, amount);
  console.log(`Deposit masuk: ${amount} ${asset}`);
});