const { model } = require('mongoose');
const { BalanceSchema } = require('../schemas/BalanceSchema');

const BalanceModel = model('Balance', BalanceSchema);

module.exports = { BalanceModel };