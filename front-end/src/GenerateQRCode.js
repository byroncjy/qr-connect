import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "./GenerateQRCode.css";
import { jwtDecode } from 'jwt-decode';


const GenerateQRCode = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
	const token = localStorage.getItem('token');
	console.log(token);
	if (!token) {
	console.error('No token found');
	return;
	}
      
	const fetchUserId = async () => {
	try {
	const decodedToken = jwtDecode(token);
	const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/GenerateQRCode`, { decodedToken }, {
		headers: {
		Authorization: `Bearer ${token}`
		}
	});
      
	setUserId(response.data.decodedToken.userId);
	console.log(response.data.decodedToken.userId);
	} catch (error) {
	console.error("Error fetching user ID:", error);
	}
	};
      
	fetchUserId();
      }, []);
      

    return (
        <div className="generateQRCodeContainer">
            <div className="generateQRCodeText">Scan this QR Code</div>
            <div className="qrCode">
                <QRCode
                    value={userId || "Placeholder Value"}
                    size={128}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="L"
                />
            </div>
        </div>
    );
};

export default GenerateQRCode;
