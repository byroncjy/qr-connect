import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './EditInformation.css'

const platformOptions = [
  { value: '', label: 'Select platform' },
  { value: 'Phone number', label: 'Phone number' },
  { value: 'Personal website', label: 'Personal website' },
  { value: 'Linkedin', label: 'Linkedin' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Github', label: 'Github' }
]

const EditInformation = () => {
  // Array of maps of containing platform, info
  const [platformInformationMap, setPlatformInformationMap] = useState([])
  // State to hold profile data
  const [profileData, setProfileData] = useState({})
  // State for error message
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch all saved data from backend upon load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/edit-information.json?key=f5770b40')
        const data = response.data
        setPlatformInformationMap(data)
      } catch (error) {
        console.error('Error fetching platform data:', error)
      }
    }
    fetchData()

    // Fetch profile data: email, firstname, lastname, profile pic
    // As of now, only profile pic is editable - the others should be tied to account registration
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

  // Handle change in platform name
  const handlePlatformChange = (index, event) => {
    const { value } = event.target
    const updatedPlatformInformationMap = [...platformInformationMap]
    updatedPlatformInformationMap[index].platform = value
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  // Handle change in platform information
  const handleInfoChange = (index, event) => {
    const updatedPlatformInformationMap = [...platformInformationMap]
    updatedPlatformInformationMap[index].info = event.target.value
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  // Handle adding new entry of platform name and information
  const handleAddPlatformInformation = () => {
    const updatedPlatformInformationMap = [...platformInformationMap, { platform: '', info: '' }]
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  // Handle deleting an entry of platform name and information
  const handleDeletePlatform = (index) => {
    const updatedPlatformInformationMap = platformInformationMap.filter((_, i) => i !== index)
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  // Handles user uploading new profile picture
  // For now, it sends image as multipart form data to API
  // This assumes our API will be set up to receive images this way, but subject to change
  // Then saves a local browser url that temporarily holds the image to profileData
  const handleProfilePictureUpload = async (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('file', image)

    try {
      const response = await axios.put(
        'https://my.api.mockaroo.com/profile.json?key=f5770b40&__method=PUT',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.status === 200) {
        // Update the profile picture in the UI
        setProfileData({ ...profileData, url_picture: URL.createObjectURL(image) })
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error)
    }
  }

  // Handle saving all platform information (does not include profile picture)
  // Duplicate entries with non-empty info will not be allowed to save
  // Any entry with empty platform or info will not get saved
  const handleSave = async () => {
    try {
      // Check for duplicate entries
      const platformNames = new Set()
      let hasDuplicates = false
      for (const item of platformInformationMap) {
        if (item.platform && item.info) {
          if (platformNames.has(item.platform)) {
            hasDuplicates = true
            break
          } else {
            platformNames.add(item.platform)
          }
        }
      }

      if (hasDuplicates) {
        // Set the error message
        setErrorMessage('Error: Cannot save duplicate entries of the same platform.')
        return
      } else {
        // Clear the error message
        setErrorMessage('')
      }
      // Filter out the entries with either empty platform or empty info
      const filteredPlatformInformationMap = platformInformationMap.filter(
        (item) => item.platform !== '' && item.info !== ''
      )

      const response = await axios.put(
        'https://my.api.mockaroo.com/edit-information.json?key=f5770b40&__method=PUT',
        filteredPlatformInformationMap,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw new Error(`Network response was not ok. Status Code: ${response.status}`)
      }
      // Update the platformInformationMap state
      setPlatformInformationMap(filteredPlatformInformationMap)
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  return (
    <div className="edit-information-container">
      <h2>Edit Personal Information</h2>

      {/* Displays picture and upload picture button */}
      <div className="edit-information-header">
        {/* Note that right now image urls are randomly generated via Mockaroo */}
        <img src={profileData.url_picture} alt="Profile Picture" className="profile-picture" />
        <p>Upload profile picture below: </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
        </div>
      </div>

      <div className="profile-section">
        <p>First name: {profileData.first_name}</p>
        <p>Last name: {profileData.last_name}</p>
        <p>Email: {profileData.email}</p>
      </div>
        {/* Display each row of plaform name and information */}
        {platformInformationMap.map((item, index) => (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor={`platform${index}`}></label>
                {/* Dropdown */}
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

                {/* If not Select Platform, display text input box */}
                {item.platform !== '' && (
                <input
                    type="text"
                    placeholder="Link / Information"
                    value={item.info}
                    onChange={(e) => handleInfoChange(index, e)}
                />
                )}
                {/* Delete entry */}
                <button onClick={() => handleDeletePlatform(index)}>X</button>
              </div>
            </div>
        ))}
        {/* Add new entry */}
        <button onClick={handleAddPlatformInformation}>Add another platform</button>
        {/* Save updated platform information */}
        <button type="button" className="save-button" onClick={handleSave}>
            Save
        </button>
        {/* Display error message */}
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
        )}
    </div>
  )
}

export default EditInformation
