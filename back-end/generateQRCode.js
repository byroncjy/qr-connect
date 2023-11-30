const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.js');
const jwt = require('jsonwebtoken');

router.get('/GenerateQRCode', (req, res) => {
          const token = req.headers.authorization.split(' ')[1];
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ userId: decoded.userId });
          } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
          }
        });

module.exports = router;