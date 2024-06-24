import '../styles/hero.css';
import { useState, useEffect } from 'react';

const Hero = () => {
    const heading = ['Efficient', 'Reliable', 'Simplified'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [routes] = useState(['abia', 'kano', 'kwara', 'Houston', 'Phoenix']); // Placeholder routes
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [leavingFrom, setLeavingFrom] = useState('');
    const [goingTo, setGoingTo] = useState('');
    const [showDropdown, setShowDropdown] = useState({ leavingFrom: false, goingTo: false });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % heading.length);
        }, 2500); // Change text every 2.5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [heading.length]);

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

    return (
        <>
            <section>
                <div className="hero-container">
                    <div className="heroe-image">
                        <div className="heroe-overlay">
                            <div className="hero-text">
                                <h1>Discover {heading[currentTextIndex]} Transportation solution</h1>
                            </div>
                            <div className="main-booking-container">
                                <div className="booking-container">
                                    <div className="booking-items">
                                        <input
                                            placeholder='Leaving from'
                                            type="text"
                                            value={leavingFrom}
                                            onChange={(e) => handleInputChange(e, 'leavingFrom')}
                                            onFocus={() => setShowDropdown({ ...showDropdown, leavingFrom: true })}
                                            onBlur={() => setTimeout(() => setShowDropdown({ ...showDropdown, leavingFrom: false }), 200)}
                                        />
                                        {showDropdown.leavingFrom && (
                                            <ul className="dropdown">
                                                {filteredRoutes.map((route, index) => (
                                                    <li key={index} onClick={() => handleDropdownClick(route, 'leavingFrom')}>{route}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="booking-items">
                                        <input
                                            placeholder='Going to'
                                            type="text"
                                            value={goingTo}
                                            onChange={(e) => handleInputChange(e, 'goingTo')}
                                            onFocus={() => setShowDropdown({ ...showDropdown, goingTo: true })}
                                            onBlur={() => setTimeout(() => setShowDropdown({ ...showDropdown, goingTo: false }), 200)}
                                        />
                                        {showDropdown.goingTo && (
                                            <ul className="dropdown">
                                                {filteredRoutes.map((route, index) => (
                                                    <li key={index} onClick={() => handleDropdownClick(route, 'goingTo')}>{route}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="booking-items">
                                        <input type="month" placeholder='Leaving On' />
                                    </div>
                                    <div className="booking-items"><p>Return(optional)</p></div>
                                    <div><button>Search</button></div>
                                    <div className="booking-container-overlay">
                                        <h1>hello</h1>
                                    </div>
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
