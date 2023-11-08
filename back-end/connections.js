const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/saved-connections', async (req, res) => {
  try {
    const mockApiUrl = 'https://api.mockaroo.com/api/1a199910?count=16&key=14ea8470';
    const response = await axios.get(mockApiUrl);
    const connections = response.data;

    res.json(connections);
  } catch (error) {
    console.error('Error fetching connections data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
