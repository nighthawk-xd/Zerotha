import { executeTrade } from './trading';

describe('executeTrade', () => {
  it('adds a buy order and reduces cash when funds are available', () => {
    const portfolio = [];
    const result = executeTrade({
      portfolio,
      cashBalance: 100000,
      symbol: 'INFY',
      qty: 2,
      price: 1555.45,
      side: 'BUY',
    });

    expect(result.updatedCashBalance).toBe(100000 - 2 * 1555.45);
    expect(result.updatedPortfolio).toHaveLength(1);
    expect(result.updatedPortfolio[0]).toMatchObject({
      name: 'INFY',
      qty: 2,
      avg: 1555.45,
    });
    expect(result.order.side).toBe('BUY');
  });

  it('rejects a buy when funds are insufficient', () => {
    const portfolio = [];

    expect(() =>
      executeTrade({
        portfolio,
        cashBalance: 1000,
        symbol: 'INFY',
        qty: 2,
        price: 1555.45,
        side: 'BUY',
      })
    ).toThrow('Insufficient funds');
  });

  it('rejects a sell when the position is too small', () => {
    const portfolio = [{ name: 'INFY', qty: 1, avg: 1555.45, price: 1555.45 }];

    expect(() =>
      executeTrade({
        portfolio,
        cashBalance: 100000,
        symbol: 'INFY',
        qty: 2,
        price: 1555.45,
        side: 'SELL',
      })
    ).toThrow('Not enough shares');
  });
});
