const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const path = require('path')
const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
const router = express.Router()

const User = require('./models/User.js')

// Multer handles file uploads
// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname)
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    )
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
    // tell multer to use this new filename for the uploaded file
    cb(null, newName)
  }
})
const upload = multer({ storage })

// User profile route
// Produces user profile data (note no password)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(new ObjectId(req.params.id)).exec()
    // Extracts and returns only user profile data
    const userProfileData = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      url_picture: user.url_picture
    }
    res.json(userProfileData)
  } catch (err) {
    console.error(`Error fetching user profile data: ${err}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating user information
router.put('/:id', async (req, res) => {
  try {
    // Explicit check for required fields
    // Note that extra fields will still pass, but all required fields must be present
    if (!email || !firstName || !lastName || !urlPicture) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields: email, first_name, last_name, url_picture' })
    }
    // Update user information
    const user = await User.findById(new ObjectId(req.params.id)).exec()
    user.email = req.body.email
    user.first_name = req.body.firstName
    user.last_name = req.body.lastName
    user.url_picture = req.body.url_picture
    await user.save()

    const updatedUserData = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      url_picture: user.url_picture
    }
    console.log(updatedUserData)
    res.status(200).json({ message: `User information updated successfully. ${updatedUserData}` })
  } catch (err) {
    console.error(`Error updating user information:, ${error}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating profile picture
router.put('/:id/uploadPicture', upload.single('file'), async (req, res) => {
  // Assuming the file is successfully uploaded
  if (req.file) {
    try {
      const user = await User.findById(new ObjectId(req.params.id)).exec()
      // Save the file path or name in the url_picture variable
      user.url_picture = req.file.filename
      // Then save this to the user's data in database
      await user.save()
      ${res.status(200).json({ message: `Profile picture updated successfully. url_picture}` })
    } catch(err) {
      console.error(`Error uploading user profile picture: ${error}`)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(400).json({ message: 'No file uploaded' })
  }
})

module.exports = router
