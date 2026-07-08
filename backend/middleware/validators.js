const Joi = require('joi');

// ── Reusable patterns ────────────────────────────────────────────────

const namePattern = /^[a-zA-Z\s'.'-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
const otpPattern = /^\d{4,8}$/;
const symbolPattern = /^[A-Z0-9&]+$/;

// ── Validation middleware factory ────────────────────────────────────

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.reduce((acc, detail) => {
      const field = detail.path.join('.');
      acc[field] = detail.message.replace(/"/g, '');
      return acc;
    }, {});

    return res.status(400).json({
      message: Object.values(errors)[0], // First error as main message
      errors,
    });
  }

  req.body = value; // Use sanitized values
  next();
};

// ── Schemas ──────────────────────────────────────────────────────────

const signupSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 2 characters.',
      'string.max': 'Name must be at most 50 characters.',
      'string.pattern.base': 'Name can only contain letters, spaces, hyphens, and apostrophes.',
      'any.required': 'Name is required.',
    }),
  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(emailPattern)
    .max(254)
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.pattern.base': 'Please enter a valid email address.',
      'string.max': 'Email is too long.',
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[0-9]/, 'digit')
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters.',
      'string.max': 'Password is too long.',
      'string.pattern.name': 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.',
      'any.required': 'Password is required.',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(emailPattern)
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.pattern.base': 'Please enter a valid email address.',
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
    }),
});

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 2 characters.',
      'string.max': 'Name must be at most 50 characters.',
      'string.pattern.base': 'Name can only contain letters, spaces, hyphens, and apostrophes.',
      'any.required': 'Name is required.',
    }),
});

const updateBalanceSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .max(10000000)
    .required()
    .messages({
      'number.base': 'Amount must be a valid number.',
      'number.positive': 'Amount must be greater than zero.',
      'number.max': 'Amount cannot exceed ₹1,00,00,000.',
      'any.required': 'Amount is required.',
    }),
});

const createOrderSchema = Joi.object({
  symbol: Joi.string()
    .trim()
    .uppercase()
    .min(1)
    .max(20)
    .pattern(symbolPattern)
    .required()
    .messages({
      'string.empty': 'Stock symbol is required.',
      'string.min': 'Stock symbol is required.',
      'string.max': 'Stock symbol is too long.',
      'string.pattern.base': 'Stock symbol must contain only uppercase letters, numbers, and &.',
      'any.required': 'Stock symbol is required.',
    }),
  qty: Joi.number()
    .integer()
    .min(1)
    .max(100000)
    .required()
    .messages({
      'number.base': 'Quantity must be a valid number.',
      'number.integer': 'Quantity must be a whole number.',
      'number.min': 'Quantity must be at least 1.',
      'number.max': 'Quantity cannot exceed 1,00,000.',
      'any.required': 'Quantity is required.',
    }),
  price: Joi.number()
    .positive()
    .max(10000000)
    .required()
    .messages({
      'number.base': 'Price must be a valid number.',
      'number.positive': 'Price must be greater than zero.',
      'number.max': 'Price seems too high.',
      'any.required': 'Price is required.',
    }),
  side: Joi.string()
    .uppercase()
    .valid('BUY', 'SELL')
    .required()
    .messages({
      'any.only': 'Side must be either BUY or SELL.',
      'any.required': 'Trade side is required.',
    }),
  time: Joi.string()
    .optional()
    .allow(''),
});

const holdingItemSchema = Joi.object({
  name: Joi.string().trim().min(1).max(20).required()
    .messages({
      'string.empty': 'Holding name is required.',
      'any.required': 'Holding name is required.',
    }),
  qty: Joi.number().integer().min(0).required()
    .messages({
      'number.base': 'Quantity must be a number.',
      'number.integer': 'Quantity must be a whole number.',
      'number.min': 'Quantity cannot be negative.',
      'any.required': 'Quantity is required.',
    }),
  avg: Joi.number().min(0).required()
    .messages({
      'number.base': 'Average price must be a number.',
      'number.min': 'Average price cannot be negative.',
      'any.required': 'Average price is required.',
    }),
  price: Joi.number().min(0).required()
    .messages({
      'number.base': 'Current price must be a number.',
      'number.min': 'Current price cannot be negative.',
      'any.required': 'Current price is required.',
    }),
  net: Joi.string().allow('').optional(),
}).unknown(true); // Allow extra fields like _id, userId, etc.

const updateHoldingsSchema = Joi.object({
  holdings: Joi.array()
    .items(holdingItemSchema)
    .max(500)
    .required()
    .messages({
      'array.base': 'Holdings must be an array.',
      'array.max': 'Too many holdings.',
      'any.required': 'Holdings array is required.',
    }),
});

const fundTransactionSchema = Joi.object({
  type: Joi.string()
    .uppercase()
    .valid('ADD', 'WITHDRAW')
    .required()
    .messages({
      'any.only': 'Transaction type must be ADD or WITHDRAW.',
      'any.required': 'Transaction type is required.',
    }),
  amount: Joi.number()
    .positive()
    .max(10000000)
    .required()
    .messages({
      'number.base': 'Amount must be a valid number.',
      'number.positive': 'Amount must be greater than zero.',
      'number.max': 'Amount cannot exceed ₹1,00,00,000.',
      'any.required': 'Amount is required.',
    }),
  upi: Joi.string()
    .allow('')
    .pattern(upiPattern)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid UPI ID format. Expected format: user@provider.',
    }),
  otp: Joi.string()
    .allow('')
    .optional()
    .when('type', {
      is: 'WITHDRAW',
      then: Joi.string().pattern(otpPattern).required().messages({
        'string.empty': 'OTP is required for withdrawals.',
        'string.pattern.base': 'OTP must be 4 to 8 digits.',
        'any.required': 'OTP is required for withdrawals.',
      }),
    }),
});

// ── Exports ──────────────────────────────────────────────────────────

module.exports = {
  validate,
  signupSchema,
  loginSchema,
  updateProfileSchema,
  updateBalanceSchema,
  createOrderSchema,
  updateHoldingsSchema,
  fundTransactionSchema,
};
