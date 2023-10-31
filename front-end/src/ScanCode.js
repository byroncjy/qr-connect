import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScanCode.css";


function ScanCode() {
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		async function fetchImage() {
			try {
				const LogoUrl = "https://picsum.photos/200/300";
				await axios.get(LogoUrl)
					.then(response => {
						if (response.status === 200) {
							setImageUrl(LogoUrl);
						}
					});
			} catch (error) {
				console.error(error);
			}
		}

		fetchImage();
	}, []);

	return (
		<div className='Box'>
			<div><Link to="/">Home</Link></div>
			<img className="Logo" src={imageUrl} alt=""></img>
			<div className="ScanButton">Scan</div>
		</div>
	);
}

export default ScanCode;