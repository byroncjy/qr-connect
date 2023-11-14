const express = require('express')
const axios = require('axios')
const router = express.Router()

// Route for retrieving platform information
// In final implementation, this will extract info tied to userId
router.get('/:id/platforms', async (req, res) => {
  const userId = req.params.id
  try {
    const apiUrl = process.env.API_BASE_URL_PROFILE
    const apiKey = process.env.API_SECRET_KEY
    const response = await axios.get(`${apiUrl}?key=${apiKey}`)
    const data = response.data
    console.log(`User id: ${userId}`)
    // Extracts and returns only user platform data
    res.json(data.platform_information)
    console.log(data.platform_information)
  } catch (error) {
    console.error('Error fetching user platform data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating platform information
router.put('/:id/platforms', (req, res) => {
  try {
    const userId = req.params.id
    const platformInformation = req.body
    // Authorized platform values
    const authorizedPlatforms = [
      'Phone number',
      'Personal website',
      'Linkedin',
      'Instagram',
      'Facebook',
      'Twitter',
      'Github'
    ]

    // Check if any unauthorized platforms are present in the request body
    // We can accept fewer platforms as long as all authorized, since from user side
    //  this means they have replaced some platforms
    const unauthorizedPlatforms = Object.values(platformInformation)
      .filter(platform => !authorizedPlatforms.includes(platform))
    if (unauthorizedPlatforms.length > 0) {
      return res.status(400).json({ error: 'Unauthorized platforms detected' })
    }

    // Simulate updating the database with the received platform information
    console.log(`User id: ${userId}`)
    console.log('Platform Information:', platformInformation)
    res.status(200).json({ message: 'Platform information updated successfully' })
  } catch (error) {
    console.error('Error updating platform information:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
