import React, { useState, useEffect } from 'react'
import './EditInformation.css'

const platformOptions = [
  { value: '', label: 'Select platform' },
  { value: 'Personal Website', label: 'Personal Website' },
  { value: 'Linkedin', label: 'Linkedin' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Github', label: 'Github' }
]

const EditInformation = () => {
  // Map contains key: value pairs of (platform name: info)
  const [platformInformationMap, setPlatformInformationMap] = useState([])

  // Fetch saved personal data from backend upon load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://my.api.mockaroo.com/edit-information.json?key=f5770b40')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        // updatedData updates data to the key, value names of platformInformationMap
        const updatedData = data.map((item) => {
          return { platform: item.platform_name, info: item.platform_information }
        })
        setPlatformInformationMap(updatedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
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
      // Converts platformInformationMap data into the key, value names needed for API
      const requestData = platformInformationMap.map((item) => {
        return {
          platform_name: item.platform,
          platform_information: item.info
        }
      })

      const response = await fetch(
        'https://my.api.mockaroo.com/edit-information.json?key=f5770b40&__method=PUT',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        }
      )

      if (!response.ok) {
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
      <h2>Edit Your Personal Information</h2>
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
      <br />
      <button type="button" className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

export default EditInformation
