export const executeTrade = ({ portfolio, cashBalance, symbol, qty, price, side }) => {
  const quantity = Number(qty);
  const tradePrice = Number(price);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error('Quantity must be greater than zero');
  }

  if (!Number.isFinite(tradePrice) || tradePrice <= 0) {
    throw new Error('Price must be greater than zero');
  }

  const tradeValue = quantity * tradePrice;

  if (side === 'BUY') {
    if (cashBalance < tradeValue) {
      throw new Error('Insufficient funds');
    }

    const existing = portfolio.find((item) => item.name === symbol);
    const updatedPortfolio = existing
      ? portfolio.map((item) =>
          item.name === symbol
            ? {
                ...item,
                qty: item.qty + quantity,
                avg: (item.avg * item.qty + tradePrice * quantity) / (item.qty + quantity),
              }
            : item
        )
      : [...portfolio, { name: symbol, qty: quantity, avg: tradePrice, price: tradePrice }];

    return {
      success: true,
      updatedPortfolio,
      updatedCashBalance: cashBalance - tradeValue,
      order: { symbol, qty: quantity, price: tradePrice, side },
    };
  }

  if (side === 'SELL') {
    const existing = portfolio.find((item) => item.name === symbol);

    if (!existing || existing.qty < quantity) {
      throw new Error('Not enough shares');
    }

    const updatedPortfolio = portfolio.map((item) => {
      if (item.name !== symbol) return item;
      const remainingQty = item.qty - quantity;
      return remainingQty > 0
        ? { ...item, qty: remainingQty }
        : null;
    }).filter(Boolean);

    return {
      success: true,
      updatedPortfolio,
      updatedCashBalance: cashBalance + tradeValue,
      order: { symbol, qty: quantity, price: tradePrice, side },
    };
  }

  throw new Error('Invalid trade side');
};
