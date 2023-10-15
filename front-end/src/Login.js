// Login.js
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Add your login logic here.

        // Navigate to the HomeScreen after login logic.
        navigate('/home');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input type="text" placeholder="Username" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <button type="submit" className="submit-btn">Login</button>
            </form>
            <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
}

export default Login;
