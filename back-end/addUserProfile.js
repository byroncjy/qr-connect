const express = require('express');
const router = express.Router();
const UserProfile = require('./models/UserProfileSchema');

router.post('/saveProfile', async (req, res) => {
    try {
        const userProfileData = new UserProfile({
          scanResults: req.body.scanResults.map(item => ({
                    webImage: item.webImage,
                    mediaColor: item.mediaColor,
                    webName: item.webName,
                }))
        });

        const savedProfile = await userProfileData.save();
        res.status(200).json(savedProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;