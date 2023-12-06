import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import QRCode from 'react-qr-code'
import './GenerateQRCode.css'


const GenerateQRCode = () => {
  const token = localStorage.getItem('token')
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) navigate('/login')
    else {
      // get user id
      axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/protected`,
                  { headers: { Authorization: `JWT ${token}` } })
      .then(res => setUserId(res.userId))
      .catch(err => console.error(err))
    }
  }, [token])

  return (
    <div className='generateQRCodeContainer'>
      <div className='generateQRCodeText'>Your QR Code</div>
        <div className='qrCode'>
        <QRCode
          value={userId || ''}
          size={128}
          bgColor='#ffffff'
          fgColor='#000000'
          level='L'
        />
      </div>
    </div>
  )
}

export default GenerateQRCode
