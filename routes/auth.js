const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).send('User already exists');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User does not exist');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).send('Error logging in');
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

module.exports = router;
