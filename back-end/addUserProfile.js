const express = require('express')
const router = express.Router()
const { Connection, User, Platform } = require('./models/User')
const mongoose = require('mongoose')


router.post('/saveConnection', async (req, res) => {
  try {
    const userId = req.body.userId
    const connectionData = {
      friend_id: mongoose.Types.ObjectId(req.body.friend_id),
      platforms: req.body.platforms,
      connected_date: req.body.connected_date
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { $push: { connections: connectionData } },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Connection added successfully', updatedUser })
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json({ message: error.message })
  }
})

        
        

module.exports = router
