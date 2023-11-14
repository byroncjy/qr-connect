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
