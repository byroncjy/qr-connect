const express = require('express');
const router = express.Router();
const { Connection, User } = require('./models/User');

router.get('/user/:userId/platforms', async (req, res) => {
          try {
              const userId = req.params.userId;
      

              const user = await User.findById(userId).populate('connections.platforms');

              if (!user) {
                  return res.status(404).send('User not found');
              }
      

              const platforms = user.connections.map(connection => connection.platforms).flat();
      
              res.status(200).json(platforms);
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      });

router.post('/saveConnection', async (req, res) => {
          try {
              const userNewConnection = new Connection({
                friend_id: req.body.friend_id,
                platforms: req.body.platforms,
                connected_date : req.body.connected_date
              });
        
              const SaveConnection = await userNewConnection.save();
              res.status(200).json(SaveConnection);
          } catch (error) {
              console.log("Error:", error.message);
              res.status(400).json({ message: error.message });
          }
        });

module.exports = router;