// import and instantiate express
const express = require('express') // CommonJS import style!
const app = express() // instantiate an Express object
// const path = require('path')
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');
const connectionsRoutes = require('./connections');
const unchangedImagesRouter = require('./unchanged-images'); // Ensure this path is correct
const connectionsdetailsRoutes = require('./Connectiondetails');
const addNewConnectionRoutes = require('./addUserProfile'); 

// import some useful middleware
// const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

// connect to MongoDB with Mongoose
const mongoose = require('mongoose')
const User = require('./models/User.js')

try {
  const connection_string = 
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`
  mongoose.connect(connection_string)
  console.log('Connected to MongoDB')
} catch (err) {
  console.error(`Error connecting to MongoDB: ${err}`)
}

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

// use the morgan middleware to log all incoming http requests
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(bodyParser.json());
// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'))
app.use('/images', unchangedImagesRouter);
app.use('/auth', authRoutes);

// route for root document
app.get('/', (req, res) => {
  res.send('Hello from root')
})

// Import route files
const userRoutes = require('./users')
const platformRoutes = require('./platforms')

// Use route files
app.use('/users', userRoutes)
app.use('/users', platformRoutes)
app.use('/api', connectionsRoutes);
app.use('/', connectionsdetailsRoutes);
app.use('/', addNewConnectionRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// export the express app we created to make it available to other modules
module.exports = app
