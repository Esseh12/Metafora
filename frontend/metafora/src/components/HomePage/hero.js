import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/hero.css';

const Hero = () => {
    // Define state variables
    const headings = ['Efficient', 'Reliable', 'Simplified']; // Array of headings for dynamic text
    const [currentTextIndex, setCurrentTextIndex] = useState(0); // State to manage current index of headings
    const [routes] = useState(['Abia', 'Kano', 'Kwara', 'Aba', 'Port Harcourt']); // Placeholder routes
    const [filteredRoutes, setFilteredRoutes] = useState([]); // State to hold filtered routes based on user input
    const [leavingFrom, setLeavingFrom] = useState(''); // State for input field "Leaving from"
    const [goingTo, setGoingTo] = useState(''); // State for input field "Going to"
    const [leavingOn, setLeavingOn] = useState(''); // State for input field "Leaving On"
    const [returnOn, setReturnOn] = useState(''); // State for input field "Return (optional)"
    const [showDropdown, setShowDropdown] = useState({ leavingFrom: false, goingTo: false }); // State to manage dropdown visibility
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Effect to change heading text at intervals
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % headings.length); // Update current text index cyclically
        }, 2500); // Interval time: 2.5 seconds

        // Cleanup function to clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [headings.length]); // Dependency array ensures effect runs when headings change

    // Handle input change in "Leaving from" and "Going to" fields
    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === 'leavingFrom') {
            setLeavingFrom(value); // Update leavingFrom state
            setFilteredRoutes(routes.filter(route => route.toLowerCase().includes(value.toLowerCase()) && route !== goingTo)); // Filter routes based on input value
            setShowDropdown({ ...showDropdown, leavingFrom: true }); // Show dropdown for leavingFrom
        } else if (type === 'goingTo') {
            setGoingTo(value); // Update goingTo state
            setFilteredRoutes(routes.filter(route => route.toLowerCase().includes(value.toLowerCase()) && route !== leavingFrom)); // Filter routes based on input value
            setShowDropdown({ ...showDropdown, goingTo: true }); // Show dropdown for goingTo
        }
    };

    // Handle dropdown item click in "Leaving from" and "Going to" fields
    const handleDropdownClick = (route, type) => {
        if (type === 'leavingFrom') {
            setLeavingFrom(route); // Set leavingFrom state to selected route
            setShowDropdown({ ...showDropdown, leavingFrom: false }); // Hide dropdown for leavingFrom
        } else if (type === 'goingTo') {
            setGoingTo(route); // Set goingTo state to selected route
            setShowDropdown({ ...showDropdown, goingTo: false }); // Hide dropdown for goingTo
        }
    };

    // Handle onBlur event for dropdowns to hide them after a short delay
    const handleBlur = (type) => {
        setTimeout(() => {
            setShowDropdown({ ...showDropdown, [type]: false }); // Hide dropdown after 200ms delay
        }, 200);
    };

    // Handle search button click to navigate to search results page
    const handleSearch = () => {
        if (leavingFrom && goingTo) {
            navigate('/search-results', { state: { leavingFrom, goingTo } }); // Navigate to search-results page with leavingFrom and goingTo states
        } else {
            alert('Please enter both Leaving from and Going to fields.');
        }
    };

    // Render JSX
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-image">
                    <div className="hero-overlay">
                        <div className="hero-text">
                            <h1>Discover {headings[currentTextIndex]} Transportation Solutions</h1> {/* Display dynamic heading text */}
                        </div>
                        <div className="main-booking-container">
                            <div className="booking-container">
                                {/* Input field for "Leaving from" */}
                                <div className="booking-items">
                                    <input
                                        placeholder="Leaving from"
                                        type="text"
                                        value={leavingFrom}
                                        onChange={(e) => handleInputChange(e, 'leavingFrom')}
                                        onFocus={() => setShowDropdown({ ...showDropdown, leavingFrom: true })}
                                        onBlur={() => handleBlur('leavingFrom')}
                                        required />
                                    {/* Dropdown for "Leaving from" */}
                                    {showDropdown.leavingFrom && (
                                        <ul className="dropdown">
                                            {filteredRoutes.map((route, index) => (
                                                <li key={index} onMouseDown={() => handleDropdownClick(route, 'leavingFrom')}>{route}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {/* Input field for "Going to" */}
                                <div className="booking-items">
                                    <input
                                        placeholder="Going to"
                                        type="text"
                                        value={goingTo}
                                        onChange={(e) => handleInputChange(e, 'goingTo')}
                                        onFocus={() => setShowDropdown({ ...showDropdown, goingTo: true })}
                                        onBlur={() => handleBlur('goingTo')}
                                        required />
                                    {/* Dropdown for "Going to" */}
                                    {showDropdown.goingTo && (
                                        <ul className="dropdown">
                                            {filteredRoutes.map((route, index) => (
                                                <li key={index} onMouseDown={() => handleDropdownClick(route, 'goingTo')}>{route}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {/* Input field for "Leaving On" */}
                                <div className="booking-items">
                                    <input
                                        type="date"
                                        placeholder="Leaving On"
                                        value={leavingOn}
                                        onChange={(e) => setLeavingOn(e.target.value)}
                                    />
                                </div>
                                {/* Input field for "Return (optional)" */}
                                <div className="booking-items">
                                    <input
                                        type="date"
                                        placeholder="Return (optional)"
                                        value={returnOn}
                                        onChange={(e) => setReturnOn(e.target.value)}
                                    />
                                </div>
                                {/* Search button */}
                                <div><button onClick={handleSearch}>Search</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
