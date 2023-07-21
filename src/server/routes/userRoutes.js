const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');


// User Registration
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(409).send('Username already taken');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).send({ userId: user._id });
});

// User Authentication
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Invalid credentials');

  // Check password
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid credentials');

  res.status(200).json({ message: 'Login Successful', userId: user._id});
});

module.exports = router;
