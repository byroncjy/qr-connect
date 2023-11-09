import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/home');
      } else {
        alert('Signup failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Username" 
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Re-enter Password" 
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup;
