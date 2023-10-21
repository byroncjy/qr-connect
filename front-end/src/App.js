import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SelectInformation from './SelectInformation'
// import logo from './logo.svg'
import './App.css'

function App () {
  return (
    <div className="App">
    {/* temporary router */}
    <Router>
    <Routes>
    <Route path="/select-information" element={<SelectInformation />} />
    </Routes>
    </Router>
    </div>
  )
}

export default App
