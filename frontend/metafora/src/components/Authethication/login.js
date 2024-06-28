import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import backgroundImage from '../../images/AutheticationBackgroundImage.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Dummy authentication logic
        if (email === 'user@example.com' && password === 'password') {
            navigate('/'); // Navigate to the home page if authenticated
        } else {
            alert('User not found. Please create an account.');
        }
    };

    return (
        <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="login-container">
                <div className="loginImg">
                    <img 
                    src="/logo192.png" // Replace with your logo path
                    alt="Metafora Logo" 
                    className="logo"
                    onClick={() => navigate('/')}
                    />
                </div>
                <div className="login-subcontainer">
                    <div>
                        <h2>Jump right back in</h2>
                        <p>Sign in to continue</p>
                    </div>
                    <div className="login-form">
                        <form onSubmit={handleLogin}>
                            <label>
                            Email Address
                            <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            />
                            </label>
                            <label>
                            Password
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            />
                            </label>
                            <button type="submit">Sign In</button>
                        </form>
                    <div className="links">
                        <a href="/forgot-password">Forgot password?</a>
                        <a href="/signup">Create account</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    );
};

export default LoginPage;
