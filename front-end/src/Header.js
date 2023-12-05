import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Use the environment variable for the API URL
      const apiUrl = process.env.REACT_APP_API_URL || ''; // Fallback to an empty string if not defined
      await axios.post(`${apiUrl}/api/auth/logout`);

      // Clear the token from local storage or cookies
      localStorage.removeItem('token'); // Adjust according to your token storage

      // Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle the error appropriately
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="header">
      {location.pathname !== '/home' && location.pathname !== '/' && (
        <button onClick={handleBack} className="back-button">Back</button>
      )}
      {location.pathname === '/home' && (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      )}
      <h1 className="header-title">QRConnect</h1>
      <div className="header-buffer"></div>
    </div>
  );
};

export default Header;
