
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConnectionDetails.css";

const ConnectionDetails = () => {
	const navigate = useNavigate()
	console.log(navigate)
	const [scanResult, setScanResult] = useState(null);
	const [isQRCodeVisible, setQRCodeVisible] = useState(false);
	const location = useLocation();
	const queryParameter = new URLSearchParams(location.search);
	const { qrImageData } = location.state;
	const qrCodeText = queryParameter.get('');

	console.log(qrCodeText);
	useEffect(() => {
		async function fetchScanResult() {
			try {
				await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/ConnectionDetails/`, { qrCodeText })
					.then(response => {
						if (response.status === 200) {
							setScanResult(response.data);
							console.log(response.data);

						}
					});
			} catch (error) {
				console.error(error);
			}
		}


		fetchScanResult();
		console.log(scanResult);
	}, []);
	//setScanResult({"id":1,"first_name":"Grover","last_name":"Taffs","platforms":[{"name":"Instgram","value":"www.example.com"},{"name":"FaceBook","value":"www.facebook.com"},{"name":"Instgram","value":"www.instgram.com"}]});
	const handleViewCode = () => {
		setQRCodeVisible(true)
	}

	const handleHideCode = () => {
		setQRCodeVisible(false)
	}

	const handleSaveCode = () => {

		const newUserConnection = {
			first_name: scanResult.first_name,
			last_name: scanResult.last_name,
			platforms: scanResult.platforms.map(platform => ({
			name: platform.name,
			value: platform.value
			})),
			connected_date: new Date() 
         };
	
		console.log(newUserConnection)
		
		axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/saveConnection`, newUserConnection)
		.then(response => {
		console.log('Profile saved successfully:', response.data);
		//navigate("/saved-connections");
		console.log("Navigate to Save Code");
		})
		.catch(error => {
		console.error('Error in saving user profile:', error);
		});
		
      }

    

	return (

		<div className='Box'>
        {scanResult && (
            <>
                <div className="userName">
                    <div>{scanResult.first_name} {scanResult.last_name}</div>
                </div>

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
                        <div className="areaE">
                            <ul>
                                <li>{platform.value}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </>
        )}

			<div className="">
				<div className="viewCode">
					<div onClick={handleViewCode}> View Code </div>
				</div>

			</div>
			{isQRCodeVisible && <img className="newQRCode" src={qrImageData} alt="Scanned QR" />}


			<div className="hideCode">
				<div onClick={handleHideCode}> Hide Code </div>
			</div>

			<div className="saveCode">
				<div onClick={handleSaveCode}> Save Code </div>
			</div>

		</div>

	);
};

export default ConnectionDetails;

