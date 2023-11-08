const express = require('express');
const cors = require('cors');
const unchangedImagesRouter = require('./unchanged-images'); // Ensure this path is correct
const app = express();

app.use(cors());
// Use the unchanged images router for requests to '/images'
app.use('/images', unchangedImagesRouter);

// Export the Express app so that it can be used by 'server.js'
module.exports = app;
