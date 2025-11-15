import walletEvents from './walletEventEmitter.js';

export function startDepositWatcher() {
  setInterval(() => {
    walletEvents.emit('deposit_detected', {
      userId: '12345',
      asset: 'USDT',
      amount: 50
    });
  }, 5000);
}