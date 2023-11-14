const express = require('express');
const axios = require('axios');
const router = express.Router();

// Here we're using router.get, NOT app.get
router.get('/home-logo-image', async (req, res) => {
  try {
    const response = await axios.get('https://picsum.photos/400', { responseType: 'stream' });

    res.setHeader('content-type', response.headers['content-type']);

    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching image from Picsum:', error);
    res.status(500).send('Error fetching image');
  }
});

module.exports = router;