const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.js');

const apiBaseUrl = process.env.API_BASE_URL;
const apiKey = process.env.LARA_API_KEY;
const authenticateToken = require('./authRoutes');

router.get('/saved-connections', authenticateToken, async (req, res, next) => {
  if (process.env.SIMULATE_ERROR === 'true') {
    const err = new Error('Simulated server error');
    err.status = 500;
    return next(err); 
  }

  try {
    const mockApiUrl = `${apiBaseUrl}?key=${apiKey}`;
    const response = await axios.get(mockApiUrl);
    const connections = response.data;

    res.json(connections);
  } catch (error) {
    console.error('Error fetching connections data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user-connections/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('User ID:', userId); 

    const userConnections = await User.findById(userId).select('connections').populate('connections');
    console.log('User Connections:', userConnections);     if (!userConnections) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userConnections.connections);
  } catch (error) {
    console.error('Error fetching user connections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = router;
