import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/login.css';
import Logo from '../../images/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
    const navigate = useNavigate();

    const location = useLocation();
    const { selectedSeat, busDetails } = location.state;
  

    const handleLogin = async (e) => {
        e.preventDefault();

        // Dummy authentication logic
        // if (email === 'user@example.com' && password === 'password') {
        //     navigate('/');// Navigate to the home page if authenticated
        // } else {
        //     alert('User not found. Please create an account.');
        // }

        fetch('https://metafora.pythonanywhere.com/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data['status'] !== 200){
                throw new Error(data['error']);
            } else {
                console.log(data['tokens']['access'])
                localStorage.setItem("accessToken", data['tokens']['access']);
                localStorage.setItem('loggedIn', '1');
                // console.log(data['msg']);
                alert("logged in succcessffullt");
                console.log(`User is: ${data['userId']}`);
                localStorage.setItem('userID', data['userId']);
                // const busDetailss = {...busDetails, userId: data['userId']};

                navigate('/payment', {state:{selectedSeat, busDetails}});// Navigate to the home page if authenticated
            }
        })
        .catch(error => {
            // console.log(error)
            alert(`User not found: Please create an account.\n${error}.`);
            // navigate('/login');// Navigate back to /login page if not authenticated    
        });
    };

    return (
        <div className="login-page" >
            <div className="login-container">
                <div className="loginImg">
                    <img 
                    src={Logo}
                    alt="Metafora Logo" 
                    className="logo"
                    onClick={() => navigate('/')}
                    />
                    <h2 onClick={() => navigate('/')}>Metafora</h2>
                </div>
                <div className="login-subcontainer">
                    <div>
                        <h2>Jump right back in</h2>
                        <h5>Sign in to continue</h5>
                    </div>
                    <div className="login-form">
                        <form onSubmit={handleLogin}>
                            <label>
                                Email Address
                            </label>
                            <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                            <label>
                                Password
                            </label>
                            
                            <div className="password-container">
                                <input className='password-input'
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
                            <a href="/forgot-password" className='links'> Forgot password?</a>
                            <div className="last__div">
                                <a href="/signup"><span className="links__span">New User?</span>Create account</a>
                                <button type="submit">Sign in</button>
                            </div>
                        </form>
                </div>
                </div>
            </div>
        </div>
        
    );
};

export default Signup;
