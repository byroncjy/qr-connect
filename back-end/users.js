const express = require('express')
const axios = require('axios')
const path = require('path')
const multer = require('multer') // middleware to handle HTTP POST requests with file uploads
const router = express.Router()

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
// In final implementation, this will query userId in database to retrieve user info if id exists
router.get('/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const apiUrl = process.env.API_BASE_URL_PROFILE
    const apiKey = process.env.API_SECRET_KEY
    const response = await axios.get(`${apiUrl}?key=${apiKey}`)
    const data = response.data
    console.log(`User id: ${userId}`)
    // Extracts and returns only user profile data
    const userProfileData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      url_picture: data.url_picture
    }
    res.json(userProfileData)
  } catch (error) {
    console.error('Error fetching user profile data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating user information
router.put('/:id', (req, res) => {
  try {
    // Update user information
    // Simulate updating the database with only these fields
    const userId = req.params.id
    const { email, first_name: firstName, last_name: lastName, url_picture: urlPicture } = req.body
    // Explicit check for required fields
    // Note that extra fields will still pass
    if (!email || !firstName || !lastName || !urlPicture) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields: email, first_name, last_name, url_picture' });
    }
    const updatedUserData = {
      email,
      firstName,
      lastName,
      urlPicture
    }
    console.log(userId)
    console.log(updatedUserData)
    res.status(200).json({ message: 'User information updated successfully', updatedUserData })
  } catch (error) {
    console.error('Error updating user information:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating profile picture
router.put('/:id/uploadPicture', upload.single('file'), (req, res) => {
  // Assuming the file is successfully uploaded
  if (req.file) {
    // Right now, we simulate updating the database with the new profile picture
    // Save the file path or name in the url_picture variable
    const urlPicture = req.file.filename
    // Then save this to the userId's data in database

    // Return a success message or the updated user profile data
    res.status(200).json({ message: 'Profile picture updated successfully', urlPicture })
  } else {
    res.status(400).json({ message: 'No file uploaded' })
  }
})

module.exports = router
