import { Link } from 'react-router-dom'
import './ConnectionDetails.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionDetails = ({ ScanedInfo }) => {
          const [imageUrl, setImageUrl] = useState('');

          useEffect(() => {
                    async function fetchImage() {
                              try {
                                        const LogoUrl = 'https://picsum.photos/200/300'
                                        await axios.get(LogoUrl)
                                                  .then(response => {
                                                            if (response.status === 200) {
                                                                      setImageUrl(LogoUrl);
                                                            }
                                                  })
                              } catch (error) {
                                        console.error(error);
                              }
                    }

                    fetchImage();
          }, []);

          return (
                    <div className='Box'>


                              <div className="DetailsContainer">
                                        <div className="areaA"><img className="PlatForms" src="../instagram-circle-icon.png"></img></div>
                                        <div className="areaB">{ScanedInfo}Bot 1</div>
                                        <div className="areaC">
                                                  <div className="ViewCode">

                                                            <Link to="/ViewCode">ViewCode</Link></div>
                                        </div>
                                        <div className="areaD">
                                                  <ul>
                                                            <li>instagram introduction 1 </li>
                                                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem printer took a galley of type and scrambled it to make a type specimen book. </li>
                                                            <li>instagram introduction 1 </li>
                                                  </ul>
                                        </div>
                                        <div className="areaE">
                                        <ul>
                                                  <li>instagram introduction 2 </li>
                                                  <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem printer took a galley of type and scrambled it to make a type specimen book. </li>
                                                  <li>instagram introduction 2 </li>
                                                  </ul>
                                        </div>
                              </div>
                    </div>

          );
}

export default ConnectionDetails;