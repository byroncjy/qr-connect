import { useLocation, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./ConnectionDetails.css"
import {jwtDecode} from 'jwt-decode'

const ConnectionDetails = () => {
	const token = localStorage.getItem('token')
  const [userId] = useState(() => token ? jwtDecode(token).userId : '')
	const navigate = useNavigate()
	const [scanResult, setScanResult] = useState([])
	const [isQRCodeVisible, setQRCodeVisible] = useState(false)
	const location = useLocation()
	const queryParameter = new URLSearchParams(location.search)
	const qrImageData = location.state ? location.state.qrImageData : null
	const qrCodeText = queryParameter.get('')

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token])

	useEffect(() => {
		async function fetchScanResult() {
			try {
				await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${qrCodeText}`,
                          { headers: { Authorization: `JWT ${token}` } })
					.then(response => {
						if (response.status === 200) {
							setScanResult(response.data)
						}
					})
			} catch (error) {
				console.error(error)
			}
		}


		fetchScanResult()

	}, [qrCodeText, token])

  useEffect(() => {
    console.log(scanResult)
  }, [scanResult])

	const handleViewCode = () => {
		setQRCodeVisible(true)
	}

	const handleHideCode = () => {
		setQRCodeVisible(false)
	}

	const handleSaveCode = () => {	
		const newUserConnection = {
      friend_id: qrCodeText,
      platforms: scanResult.platforms || [],
      connected_date: new Date()
		}
     
		console.log("New User Connection:", newUserConnection)
     
		axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/connections/save/${userId}`, newUserConnection,
                 { headers: { Authorization: `JWT ${token}` } })
		.then(response => {
      console.log(response.data.message)	
      navigate("/saved-connections")
      console.log("Navigate to Save Code")
      })
    .catch(error => {
      console.error('Error in saving user profile:', error)
    })
  }

    

	return (

		<div className='Box'>
			
        {scanResult && (
            <>
               
                {scanResult.platforms && scanResult.platforms.map((platform, index) => (
                    <div className="detailsContainer" key={index}>
                        <div className="areaB">
                            {platform.name}
                        </div>
                        <div className="areaD">
                            <ul>
                                <li>{platform.value}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </>
        )}
			
				
					<div className="viewCode">
						<div onClick={handleViewCode}> View Code </div>
					</div>

				
				{isQRCodeVisible && <img className="newQRCode" src={qrImageData} alt="Scanned QR" />}


				<div className="hideCode">
					<div onClick={handleHideCode}> Hide Code </div>
				</div>

				<div className="saveCode">
					<div onClick={handleSaveCode}> Save Code </div>
				</div>

				
			</div>
		

	)
}

export default ConnectionDetails

