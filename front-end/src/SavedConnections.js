import React from 'react';
import { Link } from 'react-router-dom';
import './SavedConnections.css';


const SavedConnections = () => {
  const connections = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'John Doe' },
    { id: 4, name: 'Jane Doe' },
  ];

  return (
    <div className="saved-connections-container">
      <h2>Saved Connections</h2>
      <div className="connections-grid">
        {connections.map((connection) => (
          <Link key={connection.id} to={`/ConnectionDetails/${connection.id}`} className="connection-box">
            <img src="/account.png" alt={connection.name} />
            <p>{connection.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SavedConnections;
