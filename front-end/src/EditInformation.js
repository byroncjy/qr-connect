import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditInformation.css";

const platformOptions = [
	{ value: "", label: "Select platform" },
	{ value: "Phone number", label: "Phone number" },
	{ value: "Personal website", label: "Personal website" },
	{ value: "Linkedin", label: "Linkedin" },
	{ value: "Instagram", label: "Instagram" },
	{ value: "Facebook", label: "Facebook" },
	{ value: "Twitter", label: "Twitter" },
	{ value: "Github", label: "Github" }
];

const EditInformation = () => {
	// Array of maps of containing platform, info
	const [platformInformationMap, setPlatformInformationMap] = useState([]);
	// State to hold profile data
	const [profileData, setProfileData] = useState({});
	// State for error message
	const [errorMessage, setErrorMessage] = useState("");
	const [buttonClicked, setButtonClicked] = useState(false); // State to handle button click

  // In final implementation, we will retrieve userId of current logged in user
  // For now, we just mock userId
  const userId = 20

  // Fetch all saved data from backend upon load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We are taking REACT_APP_BACKEND_SERVER_HOSTNAME from .env file
        // Ensure .env file is setup for this to work
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_HOSTNAME}/users/${userId}/platforms`)        
        const data = response.data
        setPlatformInformationMap(data)
      } catch (error) {
        console.error('Error fetching platform data:', error)
      }
    }
    fetchData()

    // Fetch profile data: email, firstname, lastname, profile pic
    const fetchProfileData = async () => {
      try {
        // We are taking REACT_APP_BACKEND_SERVER_HOSTNAME from .env file
        // Ensure .env file is setup for this to work
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_HOSTNAME}/users/${userId}`)
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
		const { value } = event.target;
		const updatedPlatformInformationMap = [...platformInformationMap];
		updatedPlatformInformationMap[index].platform = value;
		setPlatformInformationMap(updatedPlatformInformationMap);
	};

	// Handle change in platform information
	const handleInfoChange = (index, event) => {
		const updatedPlatformInformationMap = [...platformInformationMap];
		updatedPlatformInformationMap[index].info = event.target.value;
		setPlatformInformationMap(updatedPlatformInformationMap);
	};

	// Handle adding new entry of platform name and information
	const handleAddPlatformInformation = () => {
		const updatedPlatformInformationMap = [...platformInformationMap, { platform: "", info: "" }];
		setPlatformInformationMap(updatedPlatformInformationMap);
	};

	// Handle deleting an entry of platform name and information
	const handleDeletePlatform = (index) => {
		const updatedPlatformInformationMap = platformInformationMap.filter((_, i) => i !== index);
		setPlatformInformationMap(updatedPlatformInformationMap);
	};

	// Handle adding a new row for a custom platform
    const handleAddCustomPlatform = () => {
        const updatedPlatformInformationMap = [
            ...platformInformationMap,
			// add isCustom flag
            { platform: "", info: "", isCustom: true}, 
        ];
        setPlatformInformationMap(updatedPlatformInformationMap);
    };

  // Handles user uploading new profile picture
  // Sends image as multipart form data to backend uploadPicture route
  // Then saves a local browser url that temporarily holds the image to profileData
  const handleProfilePictureUpload = async (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('file', image)

    try {
      const response = await axios.put(
        // Ensure .env file is set up for this to work
        `${process.env.REACT_APP_BACKEND_SERVER_HOSTNAME}/users/${userId}/uploadPicture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

			if (response.status === 200) {
				// Update the profile picture in the UI
				setProfileData({ ...profileData, url_picture: URL.createObjectURL(image) });
			}
		} catch (error) {
			console.error("Error uploading profile picture:", error);
		}
	};

  // Handle saving all profile data and platform information (does not include profile picture)
  // Duplicate entries with non-empty info will not be allowed to save
  // Any entry with empty platform or info will not get saved
  const handleSave = async () => {
    // Saving of profile data
    try {
      // Update buttonClicked state to trigger the CSS effect
      setButtonClicked(true);
      setTimeout(() => {
        // Reset buttonClicked state after a delay
        setButtonClicked(false);
      }, 1000); // Set the duration of the darkening effect (in milliseconds)

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_HOSTNAME}/users/${userId}`,
        profileData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status !== 200) {
        throw new Error(`Network response was not ok. Status Code: ${response.status}`)
      }
      setProfileData(profileData) // Update profileData after successful save
    } catch (error) {
      console.error('Error saving data:', error)
    }
    // Saving of platform info
    try {
      // Check for duplicate entries
      const platformNames = new Set();
      for (const item of platformInformationMap) {
        if (item.platform && item.info) {
          if (platformNames.has(item.platform)) {
            // Set the error message immediately if a duplicate is found
            setErrorMessage('Error: Cannot save duplicate entries of the same platform.')
            return;
          } else {
            platformNames.add(item.platform)
          }
        }
      }
      // Clear the error message if no duplicates are found
      setErrorMessage('');
      // Filter out the entries with either empty platform or empty info
      // Also only extract out platform and info, not isCustom
      const filteredPlatformInformationMap = platformInformationMap
        .filter((item) => item.platform !== '' && item.info !== '')
		.map(({ platform, info }) => ({ platform, info }))

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_HOSTNAME}/users/${userId}/platforms`,
        filteredPlatformInformationMap,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

			if (response.status !== 200) {
				throw new Error(`Network response was not ok. Status Code: ${response.status}`);
			}
			// Update the platformInformationMap state
			setPlatformInformationMap(filteredPlatformInformationMap);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	return (
		<div className="edit-information-container">
			<h2>Edit Personal Information</h2>

      {/* Displays picture and upload picture button */}
      <div className="edit-information-header">
        {/* Note that right now image urls are randomly generated via Mockaroo */}
        <img src={profileData.url_picture} alt="Profile" className="profile-picture" />
        <div className="upload-container">
			<label htmlFor="file-upload" className="custom-file-upload">
				Upload picture
			</label>
			<input
				id="file-upload"
				type="file"
				accept="image/*"
				onChange={handleProfilePictureUpload}
			/>
        </div>
      </div>
			<div className="profile-section">
				<p>Name: </p>
				<input
					type="text"
					placeholder="First name"
					value={profileData.first_name}
					onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Last name"
					value={profileData.last_name}
					onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
				/>
				<p>Email: {profileData.email}</p>
			</div>
			{/* Display each row of plaform name and information */}
			{platformInformationMap.map((item, index) => (
				<div key={index}>
					<div className="platform-container">
						{/* Conditionally render based on whether it's a custom platform */}
                        {item.isCustom ? (
                            <>
                                {/* Two text boxes for custom platform */}
                                <input
                                    type="text"
                                    placeholder="Platform"
                                    value={item.platform}
                                    onChange={(e) =>
                                        handlePlatformChange(index, e)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Link / Information"
                                    value={item.info}
                                    onChange={(e) => handleInfoChange(index, e)}
                                />
                            </>
                        ) : (
                            <>
                                {/* Dropdown + text box for non-custom platforms */}
                                <select
                                    value={item.platform}
                                    onChange={(e) =>
                                        handlePlatformChange(index, e)
                                    }
                                >
                                    {platformOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Text input for non-custom platforms */}
                                {item.platform !== "" && (
                                    <input
                                        type="text"
                                        placeholder="Link / Information"
                                        value={item.info}
                                        onChange={(e) =>
                                            handleInfoChange(index, e)
                                        }
                                    />
                                )}
                            </>
                        )}
						{/* Delete entry */}
						<button onClick={() => handleDeletePlatform(index)}>X</button>
					</div>
				</div>
			))}
			{/* Add new entry */}
			<button onClick={handleAddPlatformInformation}>Add platform</button>
			
			{/* Add button for adding custom platform */}
            <button onClick={handleAddCustomPlatform}>Add custom platform</button>

			{/* Save updated platform information */}
			<button
				type="button"
				className={`save-button ${buttonClicked ? "clicked" : ""}`}
				onClick={handleSave}
			>
				Save
			</button>
			{/* Display error message */}
			{errorMessage && (
				<div className="error-message">{errorMessage}</div>
			)}
		</div>
	);
};

export default EditInformation;
