import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import './SavedConnections.css';

const SavedConnections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Retrieve token from local storage
        if (!token) {
          console.error('No token found');
          return;
        }

        // Decode token to get user ID
        const decoded = jwtDecode(token); 
        const userId = decoded.userId;

        const apiUrl = `${process.env.REACT_APP_API_URL_LK}/user-connections/${userId}`;
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setConnections(response.data);
      } catch (error) {
        console.error('Error fetching connections data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="saved-connections-container">
      <div className="header">
      <h2>Saved Connections</h2>
      </div>
      <div className="connections-grid">
        {connections.map((connection) => (
          <Link key={connection.id} to={`/ConnectionDetails/${connection._id}`} className="connection-box">
            <img src={connection.profile_pic_url} alt={connection.name} />
            <p>{connection.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedConnections;
