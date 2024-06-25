import { useState, useEffect } from 'react';
import '../styles/hero.css';

const Hero = () => {
    const headings = ['Efficient', 'Reliable', 'Simplified'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [routes] = useState(['Abia', 'Kano', 'Kwara', 'Aba', 'Port Harcourt']); // Placeholder routes
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [leavingFrom, setLeavingFrom] = useState('');
    const [goingTo, setGoingTo] = useState('');
    const [leavingOn, setLeavingOn] = useState('');
    const [returnOn, setReturnOn] = useState('');
    const [showDropdown, setShowDropdown] = useState({ leavingFrom: false, goingTo: false });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % headings.length);
        }, 2500); // Change text every 2.5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [headings.length]);

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === 'leavingFrom') {
            setLeavingFrom(value);
            setFilteredRoutes(routes.filter(route => route.toLowerCase().includes(value.toLowerCase())));
            setShowDropdown({ ...showDropdown, leavingFrom: true });
        } else if (type === 'goingTo') {
            setGoingTo(value);
            setFilteredRoutes(routes.filter(route => route.toLowerCase().includes(value.toLowerCase())));
            setShowDropdown({ ...showDropdown, goingTo: true });
        }
    };

    const handleDropdownClick = (route, type) => {
        if (type === 'leavingFrom') {
            setLeavingFrom(route);
            setShowDropdown({ ...showDropdown, leavingFrom: false });
        } else if (type === 'goingTo') {
            setGoingTo(route);
            setShowDropdown({ ...showDropdown, goingTo: false });
        }
    };

    const handleBlur = (type) => {
        setTimeout(() => {
            setShowDropdown({ ...showDropdown, [type]: false });
        }, 200);
    };

    const handleSearch = () => {
        // Send data to the backend
        const searchData = {
            leavingFrom,
            goingTo,
            leavingOn,
            returnOn,
        };

        // Example backend request (adjust URL and method as needed)
        fetch('https://example.com/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-image">
                        <div className="hero-overlay">
                            <div className="hero-text">
                                <h1>Discover {headings[currentTextIndex]} Transportation Solutions</h1>
                            </div>
                            <div className="main-booking-container">
                                <div className="booking-container">
                                    <div className="booking-items">
                                        <input
                                            placeholder="Leaving from"
                                            type="text"
                                            value={leavingFrom}
                                            onChange={(e) => handleInputChange(e, 'leavingFrom')}
                                            onFocus={() => setShowDropdown({ ...showDropdown, leavingFrom: true })}
                                            onBlur={() => handleBlur('leavingFrom')}
                                        />
                                        {showDropdown.leavingFrom && (
                                            <ul className="dropdown">
                                                {filteredRoutes.map((route, index) => (
                                                    <li key={index} onMouseDown={() => handleDropdownClick(route, 'leavingFrom')}>{route}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="booking-items">
                                        <input
                                            placeholder="Going to"
                                            type="text"
                                            value={goingTo}
                                            onChange={(e) => handleInputChange(e, 'goingTo')}
                                            onFocus={() => setShowDropdown({ ...showDropdown, goingTo: true })}
                                            onBlur={() => handleBlur('goingTo')}
                                        />
                                        {showDropdown.goingTo && (
                                            <ul className="dropdown">
                                                {filteredRoutes.map((route, index) => (
                                                    <li key={index} onMouseDown={() => handleDropdownClick(route, 'goingTo')}>{route}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="booking-items">
                                        <input
                                            type="date"
                                            placeholder="Leaving On"
                                            value={leavingOn}
                                            onChange={(e) => setLeavingOn(e.target.value)}
                                        />
                                    </div>
                                    <div className="booking-items">
                                        <input
                                            type="date"
                                            placeholder="Return (optional)"
                                            value={returnOn}
                                            onChange={(e) => setReturnOn(e.target.value)}
                                        />
                                    </div>
                                    <div><button onClick={handleSearch}>Search</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
