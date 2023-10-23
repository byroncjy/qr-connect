import { Link } from 'react-router-dom'
import './ConnectionDetails.css'

const ConnectionDetails = ({ ScanedInfo }) => {
          return (
                    <div className='Box'>


                              <div class="DetailsContainer">
                                        <div class="areaA"><img className="PlatForms" src="../instagram-circle-icon.png"></img></div>
                                        <div class="areaB" style={{ backgroundColor: 'pink' }}>{ScanedInfo}Bot 1</div>
                                        <div class="areaC">
                                                  <div className="ViewCode">

                                                            <Link to="/ViewCode">ViewCode</Link></div>
                                        </div>
                                        <div class="areaD">
                                                  <ul>
                                                            <li>instagram introduction 1 </li>
                                                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem printer took a galley of type and scrambled it to make a type specimen book. </li>
                                                            <li>instagram introduction 1 </li>
                                                  </ul>
                                        </div>
                                        <div class="areaE">
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