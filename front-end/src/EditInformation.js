import React, { useState } from 'react'
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
  const [platformInformationMap, setPlatformInformationMap] = useState([{ platform: '', info: '' }])

  // Handles platform name change in dropdown
  const handlePlatformChange = (index, event) => {
    const { value } = event.target
    const updatedPlatformInformationMap = [...platformInformationMap]
    updatedPlatformInformationMap[index].platform = value
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  // Handles platform information change in text box
  const handleInfoChange = (index, event) => {
    const updatedPlatformInformationMap = [...platformInformationMap]
    updatedPlatformInformationMap[index].info = event.target.value
    setPlatformInformationMap(updatedPlatformInformationMap)
  }

  // Handles adding another platform line
  const handleAddPlatformInformation = () => {
    const updatedPlatformInformationMap = [...platformInformationMap, { platform: '', info: '' }]
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
          </div>
        </div>
      ))}
      <div style={{ margin: '20px 0' }}>
        <button onClick={handleAddPlatformInformation}>Add another platform</button>
      </div>
      <button type="save" className="save-btn">
        Save
      </button>
    </div>
  )
}

export default EditInformation
