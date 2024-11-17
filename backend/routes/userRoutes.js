const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Add user route
router.post('/add-user', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: 'User added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Vulnerable search route
router.post('/search', async (req, res) => {
  const { query } = req.body;

  try {
    // Unsafe simulation (only for educational use)
    if (query.includes("'") || query.includes("|| true")) {
      const allUsers = await User.find();
      return res.json(allUsers);
    }

    const users = await User.find({ name: query });

    if (users.length === 0) {
      return res.json({ message: 'No users found with that name' });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred' });
  }
});

module.exports = router;
