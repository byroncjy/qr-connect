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

/*
 *    NOTE! No auth here because we can't figure out why it's not working for
 *    only this route Q_Q Potentially related to Content-Type being sent?
 */

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

router.get('/:id', 
  param('id').isMongoId,
  async (req, res) => {
  const qrCodeText = req.params.id
  const names = req.query.names ? req.query.names.split(',') : []
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send('Invalid User ID')
  }

  try {
    console.log(names)
    const user = await User.findById(qrCodeText).exec()
    if (!user) {
      return res.status(404).send('User not found')
    }
    console.log("Names from query:", names);
    console.log("User platforms:", user.platforms);
    const filteredPlatforms = user.platforms.filter(platform => 
      names.includes(platform.name)
    )

    res.status(200).json(filteredPlatforms)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})


module.exports = router
