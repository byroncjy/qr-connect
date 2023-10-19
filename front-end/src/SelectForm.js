import React, { useState, useEffect } from "react"
import axios from "axios"
import "./SelectForm.css"

const SelectForm = props => {
	const [data, setData] = useState([])

	useEffect(() => {
		console.log(`Fetching user information data...`)
		axios(`https://my.api.mockaroo.com/info.json?key=820f1130`)
			.then(response => {
				setData(response.data)
				console.log(`Successfully retrieved mock data!`)
			})
			.catch(err => {
				console.log(`Maximum number of daily requests reached!`)
        		console.error(err)

				const backup = [
					{
						id: 5,
						label: "GitHub",
						content: "JohnSmithCodes",
					},
				]
				setData(backup[0])
			})
	}, [])
	return (
		<div className="SelectForm">
		{data.map(item =>
			<label key={item.id}>
				<input className="SelectEntry" type="checkbox" key={item.id} /> {item.label}: {item.content}
				<br/>
			</label>
		)}
		{/* does nothing yet...*/}
		<button type="submit" onClick={() => console.log(`Submitted form!`)}>Generate My QR Code!</button>
		</div>
	)
}

export default SelectForm
