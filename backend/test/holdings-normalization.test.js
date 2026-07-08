const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeHoldings } = require('../utils/holdings');

test('normalizeHoldings merges duplicate symbols into one entry', () => {
  const holdings = [
    { name: 'RELIANCE', qty: 1, avg: 2100, price: 2120, net: '+1.0%' },
    { name: 'RELIANCE', qty: 2, avg: 2150, price: 2160, net: '+0.5%' },
    { name: 'TCS', qty: 1, avg: 3200, price: 3210, net: '+0.3%' },
  ];

  const normalized = normalizeHoldings(holdings);

  assert.equal(normalized.length, 2);
  assert.equal(normalized[0].name, 'RELIANCE');
  assert.equal(normalized[0].qty, 3);
  assert.equal(normalized[1].name, 'TCS');
});
