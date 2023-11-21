const express = require('express');
const path = require('path');
const cors = require('cors');
const jsQR = require('jsqr');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const { createCanvas, loadImage } = require('canvas');


const router = express.Router();
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

router.get('/ScanCode', (req, res) => {
  try {
    const LogoUrl = 'https://picsum.photos/200/300';
    res.json({ LogoUrl });
  } catch (error) {
    console.error('Error in ScanCode:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/ScanCode', async (req, res) => {
  const { qrData } = req.body;
  const base64Data = qrData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  try {
    const image = await loadImage(`data:image/png;base64,${base64Data}`);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, image.width, image.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      res.json({ qrCodeText: code.data, qrImageBase64: base64Data });
    } else {
      res.status(400).send('No QR code found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

router.post('/ConnectionDetails', async (req, res) => {
  const { qrCodeText } = req.body;
  try {
    const userInfo = await axios.get(qrCodeText);
    res.json(userInfo.data);
  } catch (error) {
    console.error('Error fetching scan results:', error);
  }
});

module.exports = router;
