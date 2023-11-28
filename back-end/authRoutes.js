require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Function to generate JWT
const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET || 'yourDefaultJwtSecret';
  return jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '24h' });
};
//

// Construct MongoDB Connection String
const mongoDBUser = process.env.MONGODB_USER;
const mongoDBPass = process.env.MONGODB_PASS;
const mongoDBUri = process.env.MONGODB_URI;
const mongoDBDatabase = process.env.MONGODB_DATABASE;
const mongoDBConnectionString = `mongodb+srv://${mongoDBUser}:${mongoDBPass}@${mongoDBUri}/${mongoDBDatabase}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, first_name, last_name });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET || 'yourDefaultJwtSecret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Example of a protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.userId}` });
});


module.exports = router;