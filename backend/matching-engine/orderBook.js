export class OrderBook {
  constructor() {
    this.bids = []; // BUY orders (harga tinggi → rendah)
    this.asks = []; // SELL orders (harga rendah → tinggi)
  }

  addOrder(order) {
    if (order.side === 'buy') {
      this.bids.push(order);
      this.bids.sort((a, b) => b.price - a.price);
    } else {
      this.asks.push(order);
      this.asks.sort((a, b) => a.price - b.price);
    }
  }

  bestBid() {
    return this.bids[0] || null;
  }

  bestAsk() {
    return this.asks[0] || null;
  }
}