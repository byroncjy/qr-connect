import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SavedConnections.css';

const SavedConnections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.mockaroo.com/api/1a199910?count=16&key=14ea8470');
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
          <Link key={connection.id} to={`/ConnectionDetails/${connection.id}`} className="connection-box">
            <img src={connection.profile_pic_url} alt={connection.name} />
            <p>{connection.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SavedConnections;
