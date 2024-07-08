import { useState } from 'react';
import '../../styles/homepage.css';
import { TiTick } from "react-icons/ti";
import mockup from '../../images/mockup.png';
import partnersMockup from '../../images/PartnerMockup.png'; // Assuming a different image for partners

const About = () => {
    const [isCustomerView, setIsCustomerView] = useState(true);

    const handleCustomerClick = () => {
        setIsCustomerView(true);
    }

    const handlePartnerClick = () => {
        setIsCustomerView(false);
    }

    return (
        <>
            <section id="aboutPage-section">
                <div>
                    <div className="aboutPage-buttons">
                        <button onClick={handleCustomerClick} className={isCustomerView ? "active" : ""}>Customers</button>
                        <button onClick={handlePartnerClick} className={!isCustomerView ? "active" : ""}>Partners</button>
                    </div>
                    <div className="aboutPage-content">
                        <div className={`aboutPage-text ${isCustomerView ? "slide-in" : "slide-out"}`}>
                            {isCustomerView ? (
                                <>
                                    <div className="aboutPage-subcontent">
                                        <h1>Simplify your journey with Metafora</h1>
                                        <span><TiTick className="tick" /><p>Effortlessly connect with top transportation providers for a smooth journey</p></span>
                                    </div>
                                    <div className="aboutPage-subcontent">
                                        <h1>Discover Reliable Solutions</h1>
                                        <span><TiTick className="tick" /><p>Compare and choose the best transportation options for your needs with ease.</p></span>
                                    </div>
                                    <div className="aboutPage-subcontent">
                                        <h1>Seamless and Convenient</h1>
                                        <span><TiTick className="tick" /><p>Experience a hassle-free booking process for all your transportation requirements in one place.</p></span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="aboutPage-subcontent">
                                        <h1>Partner with Metafora</h1>
                                        <span><TiTick className="tick" /><p>Expand your reach by connecting with our wide customer base.</p></span>
                                    </div>
                                    <div className="aboutPage-subcontent">
                                        <h1>Reliable Partnerships</h1>
                                        <span><TiTick className="tick" /><p>Build trust and reliability with our seamless platform.</p></span>
                                    </div>
                                    <div className="aboutPage-subcontent">
                                        <h1>Growth Opportunities</h1>
                                        <span><TiTick className="tick" /><p>Leverage our network to grow your business efficiently.</p></span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="mockup-image">
                            <img src={isCustomerView ? mockup : partnersMockup} alt="mockup from mobile app" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;
