import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL || '';

      try {
        const response = await axios.get(`${apiUrl}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID', error);
      }
    };

    fetchUserId();
  }, []);

  const handleLogout = async () => {
    try {
      // Use the environment variable for the API URL
      const apiUrl = process.env.REACT_APP_API_URL || ''; // Fallback to an empty string if not defined
      await axios.post(`${apiUrl}/logout`);

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
      <h1 className="header-title">QRConnect</h1>
      {userId && <div className="user-id-display">User ID: {userId}</div>}
      {location.pathname === '/home' && (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      )}
    </div>
  );
};

export default Header;

