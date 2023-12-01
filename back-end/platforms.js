const express = require('express')
const { param, body, validationResult, matchedData } = require('express-validator')
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
router.put('/:id/platforms', 
  param('id').trim().notEmpty().isMongoId(),
  body('**.name').trim().notEmpty().escape(),
  body('**.value').trim().notEmpty().escape(),
  async (req, res) => {
  try {
    const result = validationResult(req)
    if (result.notEmpty()) {
      res.status(400).json({ error: 'Invalid request' })
    } else {
      const user = await User.findById(req.params.id)
      // Update the database with the received platform information
      // Need to convert plain objects to Platforms before adding
      const converted = []
      req.body.platforms.forEach(platform => {
        converted.push(new Platform({
          name: platform.name,
          value: platform.value
        }))
      })
      user.platforms = converted
      await user.save()

      res.status(200).json({ message: 'Platform information updated successfully' })
    }
  } catch (error) {
    console.error('Error updating platform information:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
