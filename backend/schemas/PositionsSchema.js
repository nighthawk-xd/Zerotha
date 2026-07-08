const { Schema } = require('mongoose');

const PositionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: String,
    required: [true, 'Product type is required.'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Position name is required.'],
    trim: true,
    minlength: [1, 'Position name cannot be empty.'],
    maxlength: [20, 'Position name is too long.'],
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [0, 'Quantity cannot be negative.'],
  },
  avg: {
    type: Number,
    required: [true, 'Average price is required.'],
    min: [0, 'Average price cannot be negative.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [0, 'Price cannot be negative.'],
  },
  net: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  isLoss: {
    type: Boolean,
    required: true,
  },
});

module.exports = { PositionsSchema };