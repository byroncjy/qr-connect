import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/"); // Redirect to login page
	};

	const handleBack = () => {
		navigate(-1); // Go back to the previous page
	};

	return (
		<div className="header">
			{location.pathname !== "/home" && location.pathname !== "/" && (
				<button onClick={handleBack} className="back-button">Back</button>
			)}
			<h1 className="header-title">QR Code Generator</h1>
			{location.pathname === "/home" && (
				<button onClick={handleLogout} className="logout-button">Logout</button>
			)}
		</div>
	);
};

export default Header;
