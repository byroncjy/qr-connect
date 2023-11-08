// app.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import ScanCode from "./ScanCode";
import ConnectionDetails from "./ConnectionDetails";
import PrivacyPolicy from "./PrivacyPolicy";
import ContactUs from "./ContactUs";
import TermOfServices from "./TermOfServices";
import './App.css';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/home" element={<HomeScreen />} />
				<Route path="/ContactUs" element={<ContactUs />} />
				<Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
				<Route path="/TermOfServices" element={<TermOfServices />} />
				<Route path="/ScanCode" element={<ScanCode />} />
				<Route path="/ConnectionDetails" element={<ConnectionDetails />} />
				<Route path="/ContactUs" element={<ContactUs />} />
				<Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
				<Route path="/ScanCode" element={<ScanCode />} />
				<Route path="/ConnectionDetails" element={<ConnectionDetails />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
