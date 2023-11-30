// Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="page-container">
		<div className="footer-container">
			<p className="footer-text">© 2023 My App. All Rights Reserved.</p>
			<div className="footer-links">
				<a href='/PrivacyPolicy'>Privacy Policy</a>
				<a href='/termOfServices'>Terms of Service</a>
				<a href="/ContactUs">Contact Us</a>
			</div>
		</div>
		</div>
	);
};

export default Footer;
