import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScanCode from './ScanCode';
import ConnectionDetails from './ConnectionDetails';

const App = props => {
  return (
    <div className="App">
      <Router>
    
        <main className="App-main">
          <Routes>
            <Route path="/ScanCode" element={<ScanCode />} />

            <Route path="/ConnectionDetails" element={<ConnectionDetails/>} />
          </Routes>
        </main>
    
      </Router>
    </div>
  )
}

export default App

