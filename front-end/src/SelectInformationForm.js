import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SelectInformationForm.css'

const SelectInformationForm = props => {
  const [data, setData] = useState(() => [])
  // track which boxes are checked
  const [checked, setChecked] = useState(() => [true]) // bool array
  const [allChecked, setAllChecked] = useState(() => true) // bool

  const handleSelectAll = () => {
    const checkedCopy = checked
    // if all checked, then uncheck, else check
    setChecked(checkedCopy.map(() => !allChecked))
  }

  const handleCheckBox = e => {
    const checkedCopy = [...checked]
    // data from mockaroo is 1-indexed
    checkedCopy[e.target.id - 1] = e.target.checked
    setChecked(checkedCopy)
    // check if all boxes checked
  }

  const handleSubmit = () => {
    // console.log('Submitted!')
  }

  // get data from api
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching user information data...')
      try {
        const response = await axios('https://my.api.mockaroo.com/info.json?key=820f1130')
        setData(response.data)
        console.log('Successfully retrieved mock data!')
      } catch (err) {
        setChecked([])
        console.log('Unable to retrieve data!')
        console.error(err)
      }
    }
    fetchData()
  }, [])

  // initialize checked after data is set
  useEffect(() => {
    setChecked(Array.from({ length: data.length }, () => true))
  }, [data])

  // check if all checked after `checked` changes (confusing i know)
  useEffect(() => {
    if (checked.length) {
      setAllChecked(checked.reduce((acc, head) => acc && head))
    }
  }, [checked])

  return (
    <div>
      <input type="checkbox"
              checked={allChecked}
              onChange={handleSelectAll} />
      <label>Select All<br/></label>
      <div>
      {data.map(item =>
        <div key={`input-div${item.id}`}>
          <input key={`input${item.id}`}
                id={item.id /* passed to update state */}
                type="checkbox"
                checked={checked[item.id - 1]}
                onChange={e => handleCheckBox(e)} />
          <label key={`label${item.id}`}>{item.label}: {item.content}<br/></label>
        </div>
      )}
      </div>
      {/* does nothing yet ... eventually should return `checked` to the QR Code Generator, probably? */}
      <button className="select-submit-button" type="button" onClick={handleSubmit()}>Generate My QR Code!</button>
    </div>
  )
}

export default SelectInformationForm
