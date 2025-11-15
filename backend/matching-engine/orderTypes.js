export function createOrder({ id, userId, side, price, amount }) {
  return {
    id,
    userId,
    side,   // buy / sell
    price,
    amount,
    timestamp: Date.now()
  };
}