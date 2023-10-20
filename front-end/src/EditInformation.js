import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './EditInformation.css'

const platformOptions = [
  { value: '', label: 'Select platform' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'Personal Website', label: 'Personal Website' },
  { value: 'Linkedin', label: 'Linkedin' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Github', label: 'Github' }
]

const EditInformation = () => {
  // Array of maps of containing platform_name, platform_information
  const [platformInformationMap, setPlatformInformationMap] = useState([])
  // State to hold profile data
  const [profileData, setProfileData] = useState({})

  // Fetch saved personal data from backend upon load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/edit-information.json?key=f5770b40')
        const data = response.data
        const updatedData = data.map((item) => {
          return { platform: item.platform_name, info: item.platform_information }
        })
        setPlatformInformationMap(updatedData)
      } catch (error) {
        console.error('Error fetching platform data:', error)
      }
    }
    fetchData()

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/profile.json?key=f5770b40')
        const data = response.data
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    fetchProfileData()
  }, [])

  const handlePlatformChange = (index, event) => {
    const { value } = event.target
    const updatedPlatformInformationMap = [...platformInformationMap]
    updatedPlatformInformationMap[index].platform = value
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  const handleInfoChange = (index, event) => {
    const updatedPlatformInformationMap = [...platformInformationMap]
    updatedPlatformInformationMap[index].info = event.target.value
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  const handleAddPlatformInformation = () => {
    const updatedPlatformInformationMap = [...platformInformationMap, { platform: '', info: '' }]
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  const handleSave = async () => {
    try {
      const requestData = platformInformationMap.map((item) => {
        return {
          platform_name: item.platform,
          platform_information: item.info
        }
      })

      const response = await axios.put(
        'https://my.api.mockaroo.com/edit-information.json?key=f5770b40&__method=PUT',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw new Error('Network response was not ok')
      }
      // Handle success
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  const handleDeletePlatform = (index) => {
    const updatedPlatformInformationMap = platformInformationMap.filter((_, i) => i !== index)
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  return (
    <div className="edit-information-container">
      <h2>Edit Personal Information</h2>
      <div className="edit-information-header">
        <img src={profileData.url_picture} alt="Profile Picture" className="profile-picture" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Centering the button */}
        <button>Upload profile picture</button>
      </div>
      <div className="profile-section">
        <p>First Name: {profileData.first_name}</p>
        <p>Last Name: {profileData.last_name}</p>
        <p>Email: {profileData.email}</p>
      </div>
        {platformInformationMap.map((item, index) => (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor={`platform${index}`}></label>

                <select
                  id={`platform${index}`}
                  value={item.platform}
                  onChange={(e) => handlePlatformChange(index, e)}
                >
                {platformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                ))}
                </select>

                {item.platform !== '' && (
                <input
                    type="text"
                    placeholder="Link / Information"
                    value={item.info}
                    onChange={(e) => handleInfoChange(index, e)}
                />
                )}

                <button onClick={() => handleDeletePlatform(index)}>X</button>
              </div>
            </div>
        ))}
        <button onClick={handleAddPlatformInformation}>Add another platform</button>
        <button type="button" className="save-btn" onClick={handleSave}>
            Save
        </button>
    </div>
  )
}

export default EditInformation
