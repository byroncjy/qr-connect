import React, { useState } from 'react'
import './EditInformation.css'

const EditInformation = () => {
  const [socialMedia, setSocialMedia] = useState([{ platform: '', info: '' }])

  const handlePlatformChange = (index, event) => {
    const updatedSocialMedia = [...socialMedia]
    updatedSocialMedia[index].platform = event.target.value
    setSocialMedia(updatedSocialMedia)
  }

  const handleInfoChange = (index, event) => {
    const updatedSocialMedia = [...socialMedia]
    updatedSocialMedia[index].info = event.target.value
    setSocialMedia(updatedSocialMedia)
  }

  const handleAddSocialMedia = () => {
    const updatedSocialMedia = [...socialMedia, { platform: '', info: '' }]
    setSocialMedia(updatedSocialMedia)
  }

  return (
    <div className="edit-information-container">
      <h2>Edit Your Personal Information</h2>
      {socialMedia.map((item, index) => (
        <div key={index}>
          <label htmlFor={`socialMedia${index}`}></label>

          <select
            id={`socialMedia${index}`}
            value={item.platform}
            onChange={(e) => handlePlatformChange(index, e)}
          >
            <option value="Select Platform">Select platform</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Other">Other</option>
          </select>

          {item.platform === 'Other' && (
            <input
              type="text"
              placeholder="Type your platform name"
              value={item.info}
              onChange={(e) => handleInfoChange(index, e)}
            />
          )}

          <label htmlFor={`textInput${index}`}></label>
          <input
            type="text"
            placeholder="Link / Information"
            id={`textInput${index}`}
            value={item.info}
            onChange={(e) => handleInfoChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleAddSocialMedia}>Add another platform</button>
      <br />
      <button type="save" className="save-btn">Save</button>
    </div>
  )
}

export default EditInformation
