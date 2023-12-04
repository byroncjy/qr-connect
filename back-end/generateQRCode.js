const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('./models/User.js');

router.post('/GenerateQRCode', async (req, res) => {
    const { decodedToken } = req.body;

    if (!decodedToken) {
        return res.status(400).json({ error: 'No decoded token provided' });
    }

    try {
        // Assuming the decoded token contains the userId
        const { userId } = decodedToken;

        if (!userId) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ userId });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
