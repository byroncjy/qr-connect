import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Select from "./Select"
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
	  {/* temporary router */}
	  <Router>
		  <Routes>
			  <Route path="/select" element={<Select />} />} />
		  </Routes>
	  </Router>
    </div>
  );
}

export default App
