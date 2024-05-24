const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Home Route
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.render('index', { transactions });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add Transaction Route
router.get('/add-transaction', (req, res) => {
  res.render('add-transaction');
});

router.post('/add-transaction', async (req, res) => {
  const { type, amount, description } = req.body;
  try {
    const newTransaction = new Transaction({ type, amount, description });
    await newTransaction.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
