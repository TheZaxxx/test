export const Ledger = {
  addBalance(userId, asset, amount) {
    console.log(`ADD → ${userId} | ${asset} +${amount}`);
  },

  subtractBalance(userId, asset, amount) {
    console.log(`SUBTRACT → ${userId} | ${asset} -${amount}`);
  },

  getBalance(userId, asset) {
    return 0; // nanti diganti database
  }
};