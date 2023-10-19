import React from "react"
import { Link } from "react-router-dom"
import SelectForm from "./SelectForm"
import "./Select.css"

const Select = props => {
	return (
		<div className="SelectForm">
			<Link to="/">Back</Link>
			<SelectForm />
		</div>
	)
}

export default Select
