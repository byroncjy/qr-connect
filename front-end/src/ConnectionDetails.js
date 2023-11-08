import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import PropTypes from 'prop-types';
import './ConnectionDetails.css';

const ConnectionDetails = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        const logoUrl = 'https://picsum.photos/200/300';
        const response = await axios.get(logoUrl);
        if (response.status === 200) {
          setImageUrl(logoUrl);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchImage();
  }, []);

  return (
    <div className='Box'>
      <div className="DetailsContainer">
        <div className="areaA">
          <img className="PlatForms" src={imageUrl} alt="Platform Icon" />
        </div>
        <div className="areaB">Bot 1</div>
        <div className="areaC">
          <div className="ViewCode">
            <Link to="/ViewCode">ViewCode</Link>
          </div>
        </div>
        <div className="areaD">
          <ul>
            <li>instagram introduction 1</li>
            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</li>
            <li>instagram introduction 1</li>
          </ul>
        </div>
        <div className="areaE">
          <ul>
            <li>instagram introduction 2</li>
            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.</li>
            <li>instagram introduction 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

//ConnectionDetails.propTypes = {
  //ScannedInfo: PropTypes.string.isRequired
//};

export default ConnectionDetails;