const express = require('express');
const cors = require('cors');
const unchangedImagesRouter = require('./unchanged-images'); // Ensure this path is correct
const app = express();

require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env

app.use(cors());
// Use the unchanged images router for requests to '/images'
app.use('/images', unchangedImagesRouter);

// Export the Express app so that it can be used by 'server.js'
module.exports = app;
