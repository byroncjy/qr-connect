import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "./GenerateQRCode.css";
import { jwtDecode } from 'jwt-decode';


const GenerateQRCode = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const decodedToken = jwtDecode(token);

                const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/GenerateQRCode`, { decodedToken }
                );

                console.log(response.data.userId);
                setUserId(response.data.userId);
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
