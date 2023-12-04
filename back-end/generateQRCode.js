const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('./models/User.js');

router.post('/GenerateQRCode', async (req, res) => {
    const { decodedToken } = req.body

    if (!decodedToken) {
        return res.status(400).json({ error: 'No decoded token provided' })
    }

    try {
        const { userId } = decodedToken

        if (!userId) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        res.json({ decodedToken })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
});

module.exports = router;
