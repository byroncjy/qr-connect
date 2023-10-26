// app.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import HomeScreen from './HomeScreen';
import EditInformation from './EditInformation'
import SavedConnections from './SavedConnections'
import SelectInformation from './SelectInformation'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import Signup from './Signup'
import ScanCode from './ScanCode';
import ConnectionDetails from './ConnectionDetails';
import logo from './logo.svg';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/edit-information" element={<EditInformation />} />
        <Route path="/saved-connections" element={<SavedConnections />} />
        <Route path="/generate-code" element={<GenerateCode />} />
        <Route path="/ScanCode" element={<ScanCode />} />
        <Route path="/ConnectionDetails" element={<ConnectionDetails/>} />
        <Route path="/select-information" element={<SelectInformation />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App

