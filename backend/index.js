require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HoldingsModel } = require('./model/HoldingsModel');
const { OrdersModel } = require('./model/OrdersModel');
const { PositionsModel } = require('./model/PositionsModel');
const { FundTransactionModel } = require('./model/FundTransactionModel');
const { BalanceModel } = require('./model/BalanceModel');
const { UserModel } = require('./model/UserModel');
const { calculateNextBalance } = require('./utils/balance');
const { normalizeHoldings } = require('./utils/holdings');
const { authMiddleware } = require('./middleware/authMiddleware');
const {
  validate,
  signupSchema,
  loginSchema,
  updateProfileSchema,
  updateBalanceSchema,
  createOrderSchema,
  updateHoldingsSchema,
  fundTransactionSchema,
} = require('./middleware/validators');

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri);

const ensureBalance = async (userId) => {
  const existing = await BalanceModel.findOne({ userId });
  if (!existing) {
    await BalanceModel.create({ userId, amount: 50000 });
  }
};

const ensureSamplePortfolio = async (userId) => {
  const holdingsCount = await HoldingsModel.countDocuments({ userId });
  if (holdingsCount === 0) {
    await HoldingsModel.insertMany([
      { userId, name: 'BHARTIARTL', qty: 2, avg: 538.05, price: 541.15, net: '+0.58%' },
      { userId, name: 'HDFCBANK', qty: 2, avg: 1383.4, price: 1522.35, net: '+10.04%' },
      { userId, name: 'HINDUNILVR', qty: 1, avg: 2335.85, price: 2417.4, net: '+3.49%' },
      { userId, name: 'INFY', qty: 1, avg: 1350.5, price: 1555.45, net: '+15.18%' },
      { userId, name: 'ITC', qty: 5, avg: 202, price: 207.9, net: '+2.92%' },
      { userId, name: 'KPITTECH', qty: 5, avg: 250.3, price: 266.45, net: '+6.45%' },
      { userId, name: 'M&M', qty: 2, avg: 809.9, price: 779.8, net: '-3.72%' },
      { userId, name: 'RELIANCE', qty: 1, avg: 2193.7, price: 2112.4, net: '-3.71%' },
      { userId, name: 'SBIN', qty: 4, avg: 324.35, price: 430.2, net: '+32.63%' },
      { userId, name: 'SGBMAY29', qty: 2, avg: 4727, price: 4719, net: '-0.17%' },
      { userId, name: 'TATAPOWER', qty: 5, avg: 104.2, price: 124.15, net: '+19.15%' },
      { userId, name: 'TCS', qty: 1, avg: 3041.7, price: 3194.8, net: '+5.03%' },
      { userId, name: 'WIPRO', qty: 4, avg: 489.3, price: 577.75, net: '+18.08%' },
    ]);
  }

  const positionsCount = await PositionsModel.countDocuments({ userId });
  if (positionsCount === 0) {
    await PositionsModel.insertMany([
      { userId, product: 'CNC', name: 'EVEREADY', qty: 2, avg: 316.27, price: 312.35, net: '+0.58%', day: '-1.24%', isLoss: true },
      { userId, product: 'CNC', name: 'JUBLFOOD', qty: 1, avg: 3124.75, price: 3082.65, net: '+10.04%', day: '-1.35%', isLoss: true },
    ]);
  }
};

// ── Auth Routes ───────────────────────────────────────────────────────

app.post('/signup', validate(signupSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await UserModel.create({ name, email, password });

    // Create empty balance for the new user
    await ensureBalance(user._id);

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/me', authMiddleware, validate(updateProfileSchema), async (req, res) => {
  try {
    const { name } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/account', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete all user data
    await UserModel.deleteOne({ _id: userId });
    await BalanceModel.deleteOne({ userId });
    await HoldingsModel.deleteMany({ userId });
    await PositionsModel.deleteMany({ userId });
    await OrdersModel.deleteMany({ userId });
    await FundTransactionModel.deleteMany({ userId });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ── Protected Routes (all require auth) ──────────────────────────────

app.get('/balance', authMiddleware, async (req, res) => {
  try {
    await ensureBalance(req.user.id);
    const balance = await BalanceModel.findOne({ userId: req.user.id });
    res.json({ amount: balance.amount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/balance', authMiddleware, validate(updateBalanceSchema), async (req, res) => {
  try {
    await ensureBalance(req.user.id);
    const { amount } = req.body;
    const updated = await BalanceModel.findOneAndUpdate(
      { userId: req.user.id },
      { amount: Number(amount), updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json({ amount: updated.amount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/holdings', authMiddleware, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/holdings', authMiddleware, validate(updateHoldingsSchema), async (req, res) => {
  try {
    const { holdings } = req.body;


    const normalizedHoldings = normalizeHoldings(holdings);

    await HoldingsModel.deleteMany({ userId: req.user.id });
    const savedHoldings = await HoldingsModel.insertMany(normalizedHoldings.map((item) => ({
      userId: req.user.id,
      name: item.name,
      qty: Number(item.qty),
      avg: Number(item.avg),
      price: Number(item.price),
      net: item.net || '',
    })));

    res.status(201).json(savedHoldings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/orders', authMiddleware, validate(createOrderSchema), async (req, res) => {
  try {
    const { symbol, qty, price, side, time } = req.body;

    const order = await OrdersModel.create({
      userId: req.user.id,
      symbol,
      qty: Number(qty),
      price: Number(price),
      side,
      time: time || new Date().toLocaleString(),
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/positions', authMiddleware, async (req, res) => {
  try {
    const positions = await PositionsModel.find({ userId: req.user.id }).sort({ name: 1 });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/fund-transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await FundTransactionModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const path = require('path');

app.post('/fund-transactions', authMiddleware, validate(fundTransactionSchema), async (req, res) => {
  try {
    const { type, amount, upi = '', otp = '' } = req.body;

    await ensureBalance(req.user.id);
    const balance = await BalanceModel.findOne({ userId: req.user.id });
    const nextAmount = calculateNextBalance(balance.amount, type, amount);

    await BalanceModel.findOneAndUpdate({ userId: req.user.id }, { amount: nextAmount, updatedAt: new Date() }, { upsert: true, new: true });

    const transaction = await FundTransactionModel.create({
      userId: req.user.id,
      type,
      amount,
      upi,
      otp,
      status: 'SUCCESS',
    });

    res.json({ transaction, balance: nextAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static React files in production
if (process.env.NODE_ENV === 'production') {
  // Serve dashboard
  app.use('/dashboard', express.static(path.join(__dirname, '../dashboard/build')));
  app.get(/^\/dashboard/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dashboard/build', 'index.html'));
  });

  // Serve frontend
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running. Set NODE_ENV=production to serve React apps.');
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
