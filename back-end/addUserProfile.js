const express = require('express')
const router = express.Router()
const { Connection, User, Platform } = require('./models/User')
const mongoose = require('mongoose')

router.get('/user/:userId/platforms', async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId).populate('connections.platforms')

    if (!user) {
      return res.status(404).send('User not found')
    }

    const platforms = user.connections.map(connection => connection.platforms).flat()

    res.status(200).json(platforms)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/saveConnection', async (req, res) => {
  try {
    const userNewConnection = new Connection({
      friend_id: req.body.friend_id,
      platforms: req.body.platforms,
      connected_date: req.body.connected_date
    })

    const SaveConnection = await userNewConnection.save()
    res.status(200).json(SaveConnection)
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json({ message: error.message })
  }
})

router.get('/create-users', async (req, res) => {
          try {
       
            const platforms = [
              new Platform({ name: 'Instagram', value: 'instagramUser' }),
              new Platform({ name: 'Facebook', value: 'facebookUser' })
            ];
        
            const connection = new Connection({ friend_id: new mongoose.Types.ObjectId(), platforms: [platforms[0]] });
        
            const usersData = [
              { email: 'user1@example.com', password: 'password1', first_name: 'John', last_name: 'Doe', platforms: [platforms[0]], connections: [connection] },
              { email: 'user2@example.com', password: 'password2', first_name: 'Jane', last_name: 'Doe', platforms: [platforms[1]], connections: [] }, 
              { email: 'user3@example.com', password: 'password3', first_name: 'Jim', last_name: 'Beam', platforms: [platforms[0]], connections: [] } 
            ];
        
            for (const userData of usersData) {
              const newUser = new User(userData);
              await newUser.save();
            }
        
            res.send('Users created successfully');
          } catch (error) {
            console.error(error);
            res.status(500).send('Error creating users');
          }
        });
        
        

module.exports = router
