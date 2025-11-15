import { MatchEngine } from './matchEngine.js';
import matchEvents from './matchEventEmitter.js';
import { createOrder } from './orderTypes.js';

const engine = new MatchEngine();

matchEvents.on('trade', (trade) => {
  console.log('TRADE MATCHED:', trade);
});

// Contoh order masuk
engine.placeOrder(createOrder({ id: '1', userId: 'A', side: 'buy',  price: 100, amount: 5 }));
engine.placeOrder(createOrder({ id: '2', userId: 'B', side: 'sell', price: 98,  amount: 3 }));
engine.placeOrder(createOrder({ id: '3', userId: 'C', side: 'sell', price: 100, amount: 2 }));