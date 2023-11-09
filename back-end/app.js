const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');
const unchangedImagesRouter = require('./unchanged-images'); // Ensure this path is correct
const app = express();

app.use(cors());
app.use(bodyParser.json());
// Use the unchanged images router for requests to '/images'
app.use('/images', unchangedImagesRouter);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the app!');
  });
// Export the Express app so that it can be used by 'server.js'
module.exports = app;
