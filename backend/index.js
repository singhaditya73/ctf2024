const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://adityasingh:8896202021@cluster0.xfjocql.mongodb.net/sqli', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/add-user', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: 'User added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

app.post('/search', async (req, res) => {
  const { query } = req.body;

  try {
    if (query.includes("'") || query.includes("|| true")) {
     
      const allUsers = await User.find();
      return res.json(allUsers);
    }

    const users = await User.find({ name: query }).exec();

    if (users.length === 0) {
      return res.json({ message: 'No users found with that name' });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
