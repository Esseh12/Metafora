import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import Logo from '../../images/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    // State variables for form inputs and errors
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handlesignup = async (e) => {
        e.preventDefault();

        // Reset any existing error messages
        setError('');

        // Basic email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email address.');
            return;
        }

        // Check if emails match
        if (email !== confirmEmail) {
            setError('Email addresses do not match.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Dummy API call to backend for signup (replace with actual API call)
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if the signup was successful
            if (response.ok) {
                navigate('/'); // Navigate to the home page if signup is successful
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signupImg">
                    <img 
                        src={Logo}
                        alt="Metafora Logo"
                        className="logo"
                        onClick={() => navigate('/')} // Navigate to home on logo click
                    />
                    <h2 onClick={() => navigate('/')}>Metafora</h2>
                </div>
                <div className="signup-subcontainer">
                    <div>
                        <h2>Create an account</h2>
                        <h5>Sign up to get started</h5>
                    </div>
                    <div className="signup-form">
                        <form onSubmit={handlesignup}>
                            <div className="name__div">
                                <div>
                                    <label>First Name</label>
                                    <input type="text" required />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" required />
                                </div>
                            </div>
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Confirm Email Address</label>
                            <input 
                                type="email" 
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                required
                            />
                            <label>Password</label>
                            <div className="password-container">
                                <input 
                                    className='password-input'
                                    type={showPassword ? "text" : "password"} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <span 
                                    className="toggle-password" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <label>Confirm Password</label>
                            <div className="password-container">
                                <input 
                                    className='password-input'
                                    type={showPassword ? "text" : "password"} 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                />
                                <span 
                                    className="toggle-password" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {error && <div className="error">{error}</div>}
                            <div className="last__div">
                                <a href="/login"><span className="links__span">Have an account?</span>Sign in</a>
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
