const express = require('express');
const router = express.Router();
const { Connection } = require('./models/User');

router.post('/saveConnection', async (req, res) => {
          try {
              const userNewConnection = new Connection({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                platforms: req.body.platforms,
              });
        
              const SavedConnection = await userNewConnection.save();
              res.status(200).json(SavedConnection);
          } catch (error) {
              res.status(400).json({ message: error.message });
          }
        });

module.exports = router;