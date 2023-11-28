const express = require('express')
const cors = require('cors')
const jsQR = require('jsqr')
const axios = require('axios')
const { User } = require('./models/User')
require('dotenv').config()
const { createCanvas, loadImage } = require('canvas')
const { isValidObjectId } = require('mongoose')

const router = express.Router()
router.use(cors())
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get('/ScanCode', (req, res) => {
  try {
    const LogoUrl = 'https://picsum.photos/200/300'
    res.json({ LogoUrl })
  } catch (error) {
    console.error('Error in ScanCode:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.post('/ScanCode', async (req, res) => {
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
      res.status(400).send('No QR code found.')
    }
  } catch (error) {
    console.error(error)
    res.status(500)
  }
})

router.post('/ConnectionDetails', async (req, res) => {
  const { qrCodeText } = req.body
  console.log(qrCodeText)
  try {
    const response = await axios.post(`${process.env.BACK_END_HOST}/user/searchUser`, { userId: qrCodeText })
    res.json(response.data)
  } catch (error) {
    console.error('Error in internal request:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/user/searchUser', async (req, res) => {
  try {
    const userId = req.body.userId
    console.log(`UserID: ${userId}, Valid: ${isValidObjectId(userId)}`)

    const user = await User.findOne({ _id: userId })
    console.log('User found:', user)

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router