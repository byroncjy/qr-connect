const express = require('express')
const cors = require('cors')
const jsQR = require('jsqr')
const axios = require('axios')
const { User } = require('./models/User.js')
const { createCanvas, loadImage } = require('canvas')
const { isValidObjectId } = require('mongoose')
const { param, body, validationResult } = require('express-validator')
const passport = require('passport')
const router = express.Router()
router.use(cors())
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post('/*', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    next()
  }
)

// /scan (decodes QR code)
router.post('/',
  body('qrData').notEmpty().withMessage('QR data is required'),
  async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("Error")
    return res.status(400).json({ errors: errors.array() })
  }

  const { qrData } = req.body

  const base64Data = qrData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')

  try {
    const image = await loadImage(`data:image/png;base64,${base64Data}`)
    const canvas = createCanvas(image.width, image.height)
    const context = canvas.getContext('2d')

    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, image.width, image.height)

    const code = jsQR(imageData.data, imageData.width, imageData.height)

    if (code) {
      res.json({ qrCodeText: code.data, qrImageBase64: base64Data })
    } else {
      console.log('No QR code found in the provided image.')
      res.status(400).send('No QR code found.')
    }
  } catch (error) {
    console.error('Error processing QR code:', error)
    res.status(500).send('Error processing QR code')
  }
})

module.exports = router
