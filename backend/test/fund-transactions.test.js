const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { FundTransactionSchema } = require('../schemas/FundTransactionSchema');
const { calculateNextBalance } = require('../utils/balance');

const FundTransactionModel = mongoose.model('FundTransactionTest', FundTransactionSchema);

test('ADD fund transactions should validate without UPI or OTP', async () => {
  const transaction = new FundTransactionModel({
    type: 'ADD',
    amount: 1000,
    status: 'SUCCESS',
  });

  await assert.doesNotReject(() => transaction.validate());
});

test('deposit increases available balance and withdrawal decreases it', () => {
  assert.equal(calculateNextBalance(50000, 'ADD', 1000), 51000);
  assert.equal(calculateNextBalance(50000, 'WITHDRAW', 2500), 47500);
});
