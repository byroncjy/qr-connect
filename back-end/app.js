// import and instantiate express
const express = require('express') // CommonJS import style!
const app = express() // instantiate an Express object
// const path = require('path')

// import some useful middleware
// const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

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

// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'))

// route for root document
app.get('/', (req, res) => {
  res.send('Hello from root')
})

// Multer is commented out until needed
// // enable file uploads saved to disk in a directory named 'public/uploads'
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     // take apart the uploaded file's name so we can create a new one based on it
//     const extension = path.extname(file.originalname)
//     const basenameWithoutExtension = path.basename(
//       file.originalname,
//       extension
//     )
//     // create a new filename with a timestamp in the middle
//     const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
//     // tell multer to use this new filename for the uploaded file
//     cb(null, newName)
//   }
// })
// const upload = multer({ storage })

// export the express app we created to make it available to other modules
module.exports = app
