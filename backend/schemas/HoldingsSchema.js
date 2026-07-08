const { Schema } = require('mongoose');

const HoldingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Holding name is required.'],
    trim: true,
    minlength: [1, 'Holding name cannot be empty.'],
    maxlength: [20, 'Holding name is too long.'],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { HoldingsSchema };