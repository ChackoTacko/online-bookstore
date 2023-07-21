const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// Get the cart for a specific user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const cart = await Cart.findOne({ userId });
  res.json(cart ? cart.books : []);
});


// Add a book to the cart for a specific user
router.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.body.bookId;

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.books.push(book);
  } else {
    cart = new Cart({ userId, books: [book] }); // Here books is initialized with the new book
  }

  await cart.save();

  res.json(book);
});

module.exports = router;
