const express = require('express');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Function to generate JWT
const generateToken = () => { //Since we don't have a database implemented, the backend will not validate the credentials and will allow access with any username and password.
    return jwt.sign({}, 'secretKey', { expiresIn: '24h' }); 
  };
  
  // Signup route
router.post('/signup', async (req, res) => {
    const token = generateToken();
    res.status(201).json({ token });
  });
  
router.post('/login', async (req, res) => {
    const token = generateToken();
    res.json({ token });
  });
  
  module.exports = router;

// // Mock database
// const users = [];

// // Function to generate JWT
// const generateToken = (user) => {
//   // Replace 'secretKey' with a real secret key in a production environment
//   return jwt.sign({ data: user.username }, 'secretKey', { expiresIn: '24h' }); 
// };

// // Function to find a user by username
// const findUserByUsername = (username) => {
//   return users.find(user => user.username === username);
// };

// // Function to add a new user
// const addUser = (username, hashedPassword) => {
//   const newUser = {
//     id: users.length + 1,
//     username,
//     password: hashedPassword
//   };
//   users.push(newUser);
//   return newUser;
// };

// // Signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // Check if the user already exists
//     if (findUserByUsername(username)) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Save user
//     const newUser = addUser(username, hashedPassword);
//     // Generate token
//     const token = generateToken(newUser);
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating new user' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // Find user by username
//     const user = findUserByUsername(username);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     // Check if password matches
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     // Generate token
//     const token = generateToken(user);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });

// module.exports = router;
