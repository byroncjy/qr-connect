import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // TODO: Add your signup logic here.

        // Navigate to the HomeScreen after signup logic.
        navigate('/home');
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <input type="text" placeholder="Username" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <input type="password" placeholder="Re-enter Password" className="input-field" />
                <button type="submit" className="submit-btn">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
