// frontend/src/components/HomeScreen.js (assuming the file is located here)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeScreen.css';

const HomeScreen = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Use the correct port where your backend server is running.
        const response = await axios.get('http://localhost:3000/images/home-logo-image', {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setImageSrc(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <img src={imageSrc} alt="App Logo" className="app-logo" />
        <p>App Description: Lorem ipsum dolor sit...</p>
      </div>
      <div className="home-links">
        <a href="/scan-code" className="home-link">Scan Code</a>
        <a href="/edit-information" className="home-link">Edit Information</a>
        <a href="/saved-connections" className="home-link">Saved Connections</a>
        <a href="/select-information" className="home-link">Generate Code</a>
      </div>
    </div>
  );
}

export default HomeScreen;
