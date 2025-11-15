import { OrderBook } from './orderBook.js';
import matchEvents from './matchEventEmitter.js';

export class MatchEngine {
  constructor() {
    this.orderBook = new OrderBook();
  }

  placeOrder(order) {
    this.orderBook.addOrder(order);
    this.tryMatch();
  }

  tryMatch() {
    let bid = this.orderBook.bestBid();
    let ask = this.orderBook.bestAsk();

    while (bid && ask && bid.price >= ask.price) {
      const tradePrice = ask.price;
      const tradeAmount = Math.min(bid.amount, ask.amount);

      matchEvents.emit('trade', {
        price: tradePrice,
        amount: tradeAmount,
        buyOrderId: bid.id,
        sellOrderId: ask.id
      });

      bid.amount -= tradeAmount;
      ask.amount -= tradeAmount;

      if (bid.amount <= 0) this.orderBook.bids.shift();
      if (ask.amount <= 0) this.orderBook.asks.shift();

      bid = this.orderBook.bestBid();
      ask = this.orderBook.bestAsk();
    }
  }
}