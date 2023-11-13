import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token (localStorage/sessionStorage)
        localStorage.setItem('token', data.token);
        navigate("/home");
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit" className="submit-button">Login</button>
      </form>
      <button className="signup-button" onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

<<<<<<< HEAD

export default Login;

=======
export default Login;
>>>>>>> 6dbfa3115898febac8e2b1d7f83fa9e6ed596f2a
