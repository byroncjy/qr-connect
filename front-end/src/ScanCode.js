import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScanCode.css";


function ScanCode() {
	const [imageUrl, setImageUrl] = useState("");
	console.log(process.env.REACT_APP_SERVER_HOSTNAME)

	useEffect(() => {
		async function fetchImage() {
			try {
				// Request to your backend endpoint that returns the LogoUrl
				const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/ScanCode`);
				if (response.status === 200 && response.data.LogoUrl) {
					// Set imageUrl state to the LogoUrl received from the backend
					console.log(response.data)
					setImageUrl(response.data.LogoUrl);
				}
			} catch (error) {
				console.error('Error fetching image:', error.message);
			}
		}

		fetchImage();

	}, []);

	function handleFileChange(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const imageDataUrl = e.target.result;
				try {
					const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/ScanCode`, {
						qrData: imageDataUrl
					});
					console.log('Response from backend:', response.data);
				} catch (error) {
					console.error('Error sending QR data to backend:', error);
				}
			};
			reader.readAsDataURL(file);
		}
	}





	return (

		<div className='Box'>
			<script type="module" src="/static/ScanCode.js"></script>

			<div className="toHome"><Link to="/">Home</Link></div>
			<img className="Logo" src={imageUrl} alt=""></img>
			<input type="file" accept="image/*" capture="camera" id="file-input" onChange={handleFileChange} style={{ display: 'none' }} />
			<label htmlFor="file-input" className="scanButton">Scan</label>


		</div>
	);
}

export default ScanCode;