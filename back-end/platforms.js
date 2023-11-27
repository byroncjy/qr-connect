const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const router = express.Router()

const { User, Platform } = require('./models/User.js')

// Route for retrieving platform information
// In final implementation, this will extract info tied to userId
router.get('/:id/platforms', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    // Extracts and returns only user platform data
    res.status(200).json(user.platforms)
  } catch(err) {
    console.error('Error fetching user platform data:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Route for updating platform information
router.put('/:id/platforms', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    const platforms = req.body.platforms
    // Authorized platform values
    const authorized = [
      'Phone number',
      'Personal website',
      'Linkedin',
      'Instagram',
      'Facebook',
      'Twitter',
      'Github'
    ]

    // Check that all platforms are on the whitelist
    const valid = Object.values(platforms).every(platform => authorized.includes(platform.name))
    if (!valid) {
      return res.status(400).json({ error: 'Unauthorized platforms detected' })
    }

    // Update the database with the received platform information
    // Need to convert plain objects to Platforms before adding
    const converted = []
    platforms.forEach(platform => {
      converted.push(new Platform({
        name: platform.name,
        value: platform.value
      }))
    })
    user.platforms = converted
    console.log(converted[0] instanceof Platform)
    await user.save()

    res.status(200).json({ message: 'Platform information updated successfully' })
  } catch (error) {
    console.error('Error updating platform information:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
