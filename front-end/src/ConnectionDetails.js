import { useLocation, useNavigate, useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./ConnectionDetails.css"

const ConnectionDetails = () => {
	const token = localStorage.getItem('token')
  const [userId, setUserId] = useState(() => '')
	const navigate = useNavigate()
	const [scanResult, setScanResult] = useState([])
	const [isQRCodeVisible, setQRCodeVisible] = useState(false)
	const location = useLocation()
	const qrImageData = location.state ? location.state.qrImageData : null
  const params = useParams()
	const qrCodeText = params.friend_id // /cd/friend_id


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

	useEffect(() => {
		async function fetchScanResult() {
			try {
				await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${qrCodeText}/platforms`,
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
      platforms: scanResult || [],
      connected_date: new Date()
		}
     
		console.log("New User Connection:", newUserConnection)
     
		axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/connections/save/${userId}`, newUserConnection,
                 { headers: { Authorization: `JWT ${token}` } })
		.then(response => {
      navigate("/saved-connections")
      })
    .catch(error => {
      console.error('Error in saving user profile:', error)
    })
  }

    

	return (

		<div className='Box'>
			
        {scanResult && (
            <>
               
                {scanResult.map((platform, index) => (
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

