
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConnectionDetails.css";

const ConnectionDetails = () => {
	const [scanResult, setScanResult] = useState([]);
	const location = useLocation();
	const queryParameter = new URLSearchParams(location.search);
	const qrCodeText = queryParameter.get('');
        
	console.log(qrCodeText);
	useEffect(() => {
		async function fetchScanResult() {
			try {
				await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/ConnectionDetails/`,{qrCodeText})
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
							<Link to="/ViewCode"> View Code </Link>
						</div>
					</div>
		</div>

	);
};

export default ConnectionDetails;

