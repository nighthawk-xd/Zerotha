const calculateNextBalance = (currentBalance, type, amount) => {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  if (type === 'ADD') {
    return Number(currentBalance) + numericAmount;
  }

  if (type === 'WITHDRAW') {
    if (Number(currentBalance) < numericAmount) {
      throw new Error('Insufficient available cash for withdrawal');
    }
    return Number(currentBalance) - numericAmount;
  }

  throw new Error('Invalid transaction type');
};

module.exports = { calculateNextBalance };
