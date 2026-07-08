const { Schema } = require('mongoose');

const BalanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Balance amount is required.'],
    default: 50000,
    min: [0, 'Balance cannot be negative.'],
    max: [10000000, 'Balance cannot exceed ₹1,00,00,000.'],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { BalanceSchema };