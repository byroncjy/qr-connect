import React from "react";
import "./GenerateQRCode.css";
import QRCode from 'qrcode.react';

const GenerateQRCode = () => {
	return (
		<div className="QRcode">
                              <div className="code">
				<QRCode
					value="https://google.com"
					size={64}
					bgColor={"#ffffff"}
					fgColor={"#000000"}
					level={"L"}
				/>
                              </div>
		</div>
	);
};

export default GenerateQRCode;