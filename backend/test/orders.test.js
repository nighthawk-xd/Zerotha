const test = require('node:test');
const assert = require('node:assert/strict');
const { OrdersModel } = require('../model/OrdersModel');

test('order documents should persist symbol, side and time fields', () => {
  const order = new OrdersModel({
    symbol: 'RELIANCE',
    qty: 2,
    price: 2500,
    side: 'BUY',
    time: '2026-07-05 12:00:00',
  });

  assert.equal(order.symbol, 'RELIANCE');
  assert.equal(order.side, 'BUY');
  assert.equal(order.time, '2026-07-05 12:00:00');
});
