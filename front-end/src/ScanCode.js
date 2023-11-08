import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScanCode.css';

function ScanCode() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        const LogoUrl = 'https://picsum.photos/200/300';
        const response = await axios.get(LogoUrl);
        if (response.status === 200) {
          setImageUrl(LogoUrl);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchImage();
  }, []);

  return (
    <div className='Box'>
      <div><Link to="/">Home</Link></div>
      {/* Add an alt attribute to the img tag */}
      <img className="Logo" src={imageUrl} alt="Randomly generated logo"></img>
      <div className="ScanButton">Scan</div>
    </div>
  );
}

export default ScanCode;
