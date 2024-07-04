import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/hero.css';
import Loading from './loading'; // Import the Loading component


const Hero = () => {
    const headings = ['Efficient', 'Reliable', 'Simplified'];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [routes, setRoutes] = useState(['Abia', 'Kano', 'Kwara', 'Aba', 'Port Harcourt']);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [leavingFrom, setLeavingFrom] = useState('');
    const [goingTo, setGoingTo] = useState('');
    const [leavingOn, setLeavingOn] = useState('');
    const [returnOn, setReturnOn] = useState('');
    const [showDropdown, setShowDropdown] = useState({ leavingFrom: false, goingTo: false });
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % headings.length);
        }, 2500);

        return () => clearInterval(intervalId);
    }, [headings.length]);

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/parks')
        // fetch('https://metafora.pythonanywhere.com/companies')
            .then(response => response.json())
            .then(data => {
                setRoutes(data['data']);
            })
            .catch(error => console.error('Error fetching states_of_parks:', error));
    }, [])

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === 'leavingFrom') {
            setLeavingFrom(value);
            setFilteredRoutes(routes.filter(route => route.toLowerCase().includes(value.toLowerCase()) && route !== goingTo));
            setShowDropdown({ ...showDropdown, leavingFrom: true });
        } else if (type === 'goingTo') {
            setGoingTo(value);
            setFilteredRoutes(routes.filter(route => route.toLowerCase().includes(value.toLowerCase()) && route !== leavingFrom));
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
        if (leavingFrom && goingTo && leavingOn) {
            setLoading(true); // Set loading state to true
            setTimeout(() => {
                navigate('/search-results', { state: { leavingFrom, goingTo } });
            }, 500); // Delay to simulate loading
        } else {
            alert('Please enter all fields.');
        }
    };

    return (
        <>
            {loading && <Loading />} {/* Render Loading component if loading */}
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
                                            required
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
                                            required
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
