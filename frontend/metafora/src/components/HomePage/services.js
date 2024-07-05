import React, { useState } from 'react';
import '../../styles/services.css';
import { FaRegSmile, FaTruck, FaUsers } from 'react-icons/fa';


const Services = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleWaybillClick = () => {
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <section id="services-section">
            <div className="services-container">
                <div className="service-box">
                    <div className="icon-container"><FaRegSmile className="service-icon" /></div>
                    <h2>Customers</h2>
                    <p>Our platform provides seamless transportation solutions for customers.</p>
                    <a href="#more" className="service-link">See More →</a>
                    <div className="color-styling">
                        {/* <h1>hello worls</h1> */}
                    </div>
                </div>
                <div className="service-box">
                    <div className="icon-container"><FaUsers className="service-icon" /></div>
                    <h2>Partners</h2>
                    <p>Join our network as a partner and grow your business with Metafora.</p>
                    <a href="#more" className="service-link">See More →</a>
                    <div className="color-styling">
                        {/* <h1>hello worls</h1> */}
                    </div>
                </div>
                <div className="service-box" onClick={handleWaybillClick}>
                    <div className="icon-container"><FaTruck className="service-icon" /></div>
                    <h2>Delivery</h2>
                    <p>Express courier delivered parcel and services for your shipping needs.</p>
                    <a href="#more" className="service-link">See More →</a>
                    <div className="color-styling">
                        {/* <h1>hello worls</h1> */}
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content">
                        <h3>Feature Not Available</h3>
                        <p>This feature isn't available right now. Please check back later.</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Services;
