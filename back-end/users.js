const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const path = require('path')
const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
const router = express.Router()

const { User } = require('./models/User.js')

// Multer handles file uploads
// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname)
    const basename = path.basename(
      file.originalname,
      extension
    )
    // create a new filename with a timestamp in the middle
    const filename = `${basename}-${Date.now()}${extension}`
    // tell multer to use this new filename for the uploaded file
    cb(null, filename)
  }
})
const upload = multer({ storage })

// User profile route
// Produces user profile data (note no password)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec()
    // Extracts and returns only user profile data
    const user_profile = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture
    }
    res.json(user_profile)
  } catch (err) {
    console.error(`Error fetching user profile data: ${err}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating user information
router.put('/:id', async (req, res) => {
  try {
    // Update user information
    // since this is just an update and not a create we don't need to guarantee
    // every field.
    const user = await User.findById(req.params.id).exec()
    if (req.body.email) {
      user.email = req.body.email
    }
    if (req.body.firstName) {
      user.first_name = req.body.first_name
    }
    if (req.body.lastName) {
      user.last_name = req.body.last_name
    }
    if (req.body.profile_picture) {
      user.profile_picture = req.body.profile_picture
    }
    await user.save()

    res.status(200).json({ message: 'User information updated successfully.' })
  } catch (err) {
    console.error(`Error updating user information: ${err}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for getting profile_picture
router.get('/:id/profilePicture', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec()
    // Extracts and returns only user profile data
    const user_profile = {
      profile_picture: user.profile_picture
    }
    res.json(user_profile)
  } catch (err) {
    console.error(`Error fetching user profile picture: ${err}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating profile picture
router.put('/:id/uploadPicture', upload.single('file'), async (req, res) => {
  // Assuming the file is successfully uploaded
  if (req.file) {
    console.log('file')
    try {
      const user = await User.findById(req.params.id).exec()
      // Save the file path or name in the url_picture variable
      user.profile_picture = req.file.filename
      // Then save this to the user's data in database
      await user.save()
      res.status(200).json({ message: 'Profile picture updated successfully.' })
    } catch(err) {
      console.error(`Error uploading user profile picture: ${err}`)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(400).json({ message: 'No file uploaded' })
  }
})

module.exports = router
