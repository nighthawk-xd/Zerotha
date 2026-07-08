const { Schema } = require('mongoose');

const FundTransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: [true, 'Transaction type is required.'],
    enum: {
      values: ['ADD', 'WITHDRAW'],
      message: 'Transaction type must be ADD or WITHDRAW.',
    },
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
    min: [0.01, 'Amount must be greater than zero.'],
    max: [10000000, 'Amount cannot exceed ₹1,00,00,000.'],
  },
  upi: {
    type: String,
    default: '',
  },
  otp: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['PENDING', 'SUCCESS', 'FAILED'],
      message: 'Status must be PENDING, SUCCESS, or FAILED.',
    },
    default: 'PENDING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { FundTransactionSchema };