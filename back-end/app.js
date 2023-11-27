const express = require('express');
const app = express();
require('dotenv').config({ silent: true });
const morgan = require('morgan');
const cors = require('cors');

// Import routes
const authRoutes = require('./authRoutes');
const connectionsRoutes = require('./connections');
const unchangedImagesRouter = require('./unchanged-images');
const connectionsdetailsRoutes = require('./ConnectionDetails');
const userRoutes = require('./users');
const platformRoutes = require('./platforms');

// Morgan for logging requests
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static content
app.use('/static', express.static('public'));

// Routes
app.use('/images', unchangedImagesRouter);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/platforms', platformRoutes);
app.use('/api', connectionsRoutes);
app.use('/', connectionsdetailsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello from root');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
