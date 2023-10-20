import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SelectForm.css'

const SelectForm = props => {
    const [data, setData] = useState(() => [])
    // track which boxes are checked
    const [checked, setChecked] = useState(() => []) // bool array
    const [allChecked, setAllChecked] = useState(() => true) // bool

    // when "select all" is checked
    const selectAll = () => {
        const checkedCopy = checked
        // if all checked, then uncheck, else check
        setChecked(checkedCopy.map(() => !allChecked))
    }

    // when another checkbox is checked
    const checkBox = e => {
        const checkedCopy = [...checked]
        checkedCopy[e.target.id - 1] = e.target.checked
        setChecked(checkedCopy)
    }

    // get data from api
    useEffect(() => {
        console.log('Fetching user information data...')
        axios('https://my.api.mockaroo.com/info.json?key=820f1130')
            .then(response => {
                setData(response.data)
                console.log('Successfully retrieved mock data!')
            })
            .catch(err => {
                console.log('Unable to retrieve data! Likely that maximum number of requests has been reached for now.')
                console.error(err)

                // mockaroo has a daily limit for free accounts, this is for
                // when it runs out (temporary for testing)
                const backup = [
                    {
                        id: 1,
                        label: 'GitHub',
                        content: 'JohnSmithCodes'
                    },
                    {
                        id: 2,
                        label: 'Facebook',
                        content: 'JSFB'
                    },
                    {
                        id: 3,
                        label: 'Twitter',
                        content: '@htimsnhoj'
                    },
                    {
                        id: 4,
                        label: 'Birthday',
                        content: 'April 10th 2078'
                    }
                ]
                setData(backup)
            })
    }, [])

    // do the "real" initialization of `checked` when we get the data
    useEffect(() => {
        setChecked(Array.from({ length: data.length }, () => true))
    }, [data.length])

    useEffect(() => {
        // all checked? bool array so (i=>i) just counts "true"s
        setAllChecked(checked.filter(i => i).length === data.length)
    }, [checked, data.length])

    return (
        <div className="SelectForm">
            <label className="SelectAllLabel">
                <input className="SelectAllInput"
                    type="checkbox"
                    checked={allChecked}
                    onChange={selectAll} />
        Select All
                <br/>
            </label>
            {data.map(item =>
                <label key={item.id} className="SelectInputLabel">
                    <input key={item.id}
                        className="SelectInput"
                        id={item.id /* passed to update state */}
                        type="checkbox"
                        checked={checked[item.id - 1]}
                        onChange={e => checkBox(e)} />
                    {item.label}: {item.content}
                    <br/>
                </label>
            )}
            {/* does nothing yet ... eventually should return `checked` to the QR Code Generator, probably */}
            <button className="SelectSubmitButton" type="submit" onClick={() => console.log('Submitted form!')}>Generate My QR Code!</button>
        </div>
    )
}

export default SelectForm
