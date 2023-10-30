import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConnectionDetails.css'

const ConnectionDetails = ({ ScanedInfo }) => {
          const [ScanResult, setScanResult] = useState([]);

          useEffect(() => {
                    async function fetchScanResult() {
                              try {
                                        const ScanResultUrl = 'https://my.api.mockaroo.com/QRcodeResult.json?key=723ed310'
                                        await axios.get(ScanResultUrl)
                                                  .then(response => {
                                                            if (response.status === 200) {
                                                                      setScanResult(response.data);
                                                                      console.log(response.data)
                                                            }
                                                  })
                              } catch (error) {
                                        console.error(error);
                              }
                    }

                    fetchScanResult();
          }, []);

          return (
        
                    <div className='Box'>
                    {ScanResult.map((item, index) => (
                      <div className="DetailsContainer" key={index}>
                        <div className="areaA">
                          <img className="PlatForms" src={item.webImage} alt="" />
                        </div>
                        <div className="areaB" style={{ backgroundColor: item.mediaColor }}>
                          {item.webName}
                        </div>
                        <div className="areaC">
                          <div className="ViewCode">
                            <Link to="/ViewCode">ViewCode</Link>
                          </div>
                        </div>
                        <div className="areaD">
                          <ul>
                            <li>{item.Description}</li>
                        
                          </ul>
                        </div>
                        <div className="areaE">
                          <ul>
                          <li>{item.Description}</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
          );
}

export default ConnectionDetails;