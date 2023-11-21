
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConnectionDetails.css";

const ConnectionDetails = () => {
	const navigate = useNavigate()
	const [scanResult, setScanResult] = useState([]);
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

	}, []);

	const handleViewCode = () => {
		setQRCodeVisible(true)
	}

	const handleHideCode = () => {
		setQRCodeVisible(false)
	}

	const handleSaveCode = () => {
		const userProfile = {
			scanResults: scanResult.map(item => ({
				webImage: item.webImage,
				mediaColor: item.mediaColor,
				webName: item.webName,
				//descriptions: [item.Description, item.Description] // Assuming to store the description twice as per example
			}))
		};
		axios.post('/saveProfile', userProfile)
			.then(response => {
				console.log('Profile saved successfully:', response.data);

				navigate("/saved-connections");
				console.log("Navigate to Save Code");
			})
			.catch(error => {
				console.error('Error in saving user profile:', error);

			});

	}


	return (

		<div className='Box'>
			{scanResult.map((item, index) => (
				<div className="detailsContainer" key={index}>
					<div className="areaA">
						<img className="PlatForms" src={item.webImage} alt="" />
					</div>
					<div className="areaB" style={{ backgroundColor: item.mediaColor }}>
						{item.webName}
					</div>
					<div className="areaD">
						<ul>
							<li>{item.Description}</li>
							<li>{item.Description}</li>
						</ul>
					</div>
					<div className="areaE">
						<ul>
							<li>{item.Description}</li>
							<li>{item.Description}</li>
						</ul>
					</div>
				</div>
			))}

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

