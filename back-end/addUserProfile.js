const express = require('express');
const router = express.Router();
const { Connection } = require('./models/User');

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