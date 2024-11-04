const express = require('express');
const router = express.Router();
const { createUser, authenticateUser } = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Route to register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await authenticateUser(username, password);
    if (result) {
      res.json(result); // Send back the token
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
});

module.exports = router;
