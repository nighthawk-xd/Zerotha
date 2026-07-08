const { Schema } = require('mongoose');

const OrdersSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  symbol: {
    type: String,
    required: [true, 'Stock symbol is required.'],
    trim: true,
    uppercase: true,
    minlength: [1, 'Stock symbol cannot be empty.'],
    maxlength: [20, 'Stock symbol is too long.'],
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [1, 'Quantity must be at least 1.'],
    max: [100000, 'Quantity cannot exceed 1,00,000.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [0.01, 'Price must be greater than zero.'],
  },
  side: {
    type: String,
    required: [true, 'Trade side is required.'],
    enum: {
      values: ['BUY', 'SELL'],
      message: 'Side must be either BUY or SELL.',
    },
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { OrdersSchema };