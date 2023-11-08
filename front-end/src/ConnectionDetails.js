import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ConnectionDetails.css';

const ConnectionDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/connection-details/${id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return <div>User details not found.</div>;
  }

  return (
    <div className='Box'>
      <div className="DetailsContainer">
        <div className="areaA">
          <img className="PlatForms" src={userDetails.profile_pic_url || 'default-avatar.png'} alt={userDetails.name} />
        </div>
        <div className="areaB">
          {userDetails.name || 'User Name'}
        </div>
        <div className="areaC">
        </div>
        <div className="areaD">
        </div>
        <div className="areaE">
        </div>
        <div className="areaF">
          <Link to="/SavedConnections">Back to Connections</Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDetails;
