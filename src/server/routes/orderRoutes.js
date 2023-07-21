const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create a new order
router.post('/', async (req, res) => {
  const { userId } = req.body;

  // Get cart
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(400).send('No items in cart');

  // Create new order
  const order = new Order({ userId, books: cart.books });
  await order.save();

  // Empty cart
  cart.books = [];
  await cart.save();

  res.status(201).send(order);
});

module.exports = router;
