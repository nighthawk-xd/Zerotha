const { model } = require('mongoose');
const { FundTransactionSchema } = require('../schemas/FundTransactionSchema');

const FundTransactionModel = model('FundTransaction', FundTransactionSchema);

module.exports = { FundTransactionModel };