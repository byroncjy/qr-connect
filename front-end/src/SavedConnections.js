import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode' 
import './SavedConnections.css'

const SavedConnections = () => {
  const [connections, setConnections] = useState([])
  const navigate = useNavigate()
  const defaultImage = '/default.png' 
  const navigateHome = () => {
    navigate('/home')
  }
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No token found')
        return
      }

      try {
        const decoded = jwtDecode(token)
        const userId = decoded.userId
        const response = await axios.get(`http://localhost:3001/connections/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        const enhancedConnections = await Promise.all(response.data.map(async (conn) => {
          const userDetails = await axios.get(`http://localhost:3001/users/${conn.friend_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          console.log(userDetails.data)
          return {
            ...conn,
            first_name: userDetails.data.first_name,
            last_name: userDetails.data.last_name,
            profile_picture: userDetails.data.profile_picture || defaultImage
          }
        }))

        setConnections(enhancedConnections)
      } catch (error) {
        console.error('Error fetching connections data:', error)
      }
    }

    fetchData()
  }, [navigate])

  const handleConnectionClick = (friendId) => {
    if (friendId) {
      navigate(`/ConnectionDetails?=${friendId}`)
    } else {
      console.error('Undefined connection ID')
    }
  }  

  return (
    <div className="saved-connections-container">
      <div className="header-container">
        <h2>Saved Connections</h2>
        <button onClick={navigateHome} className="home-button">Home</button>
      </div>
        <div className="connections-grid">
            {connections.map((connection, index) => (
                <div key={index}
                     className="connection-box"
                     onClick={() => handleConnectionClick(connection.friend_id)}>
                    <img src={connection.profile_picture} alt={`${connection.first_name} ${connection.last_name}`} />
                    <p className="connection-box-text">{`${connection.first_name} ${connection.last_name}`}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SavedConnections
