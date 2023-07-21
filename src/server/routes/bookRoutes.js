const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

module.exports = router;
