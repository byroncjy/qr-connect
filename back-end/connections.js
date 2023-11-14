const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const apiBaseUrl = process.env.API_BASE_URL;
const apiKey = process.env.LARA_API_KEY;

router.get('/saved-connections', async (req, res, next) => {
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

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = router;
