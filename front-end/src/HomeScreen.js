// HomeScreen.js
import React from 'react';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
      <div className="home-container">
        <div className="home-header">
          <img src = 'https://picsum.photos/400' alt="App Logo" className="app-logo" />
          <p>App Description: Lorem ipsum dolor sit...</p>
        </div>
        <div className="home-links">
          <a href="/edit-information" className="home-link">Edit Information</a>
          <a href="/saved-connections" className="home-link">Saved Connections</a>
          <a href="/generate-code" className="home-link">Generate Code</a>
        </div>
      </div>
    );
}

export default HomeScreen;
