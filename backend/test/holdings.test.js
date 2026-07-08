const test = require('node:test');
const assert = require('node:assert/strict');
const { HoldingsModel } = require('../model/HoldingsModel');

test('holding documents should persist the expected portfolio fields', () => {
  const holding = new HoldingsModel({
    name: 'RELIANCE',
    qty: 3,
    avg: 2500,
    price: 2600,
    net: '2.00%',
  });

  assert.equal(holding.name, 'RELIANCE');
  assert.equal(holding.qty, 3);
  assert.equal(holding.avg, 2500);
});
