import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScanCode from './ScanCode';


const App = props => {
  return (
    <div className="App">
      <Router>
    
        <main className="App-main">
          <Routes>

            {/* a route for the home page */}
            <Route path="/ScanCode" element={<ScanCode />} />

          
          </Routes>
        </main>
    
      </Router>
    </div>
  )
}

export default App

