import logo from '../images/logo-icon.ico';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from './modal';
import '../styles/homepage.css';

const Homepage = () => {
    const heading = ['Efficient', 'Reliable', 'Simplified'];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    useEffect(() => {const intervalId = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % heading.length);
        }, 2500); // Change text every 2 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [heading.length])
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => {
        setModalOpen(true);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <section className="navbar-section">
                    <div class="navbar-overlay">
                        <nav className="navbar">
                            <div className="logo-container">
                                <img src={logo} alt="Metafora logo" className="navbar-logo" />
                                <span className="logo-text">Metafora</span>
                            </div>
                            <div className="navbar-text">
                                <ul className="navbar-list">
                                        <li className="navbar-item">Home</li>
                                    <li className="navbar-item">About</li>
                                    <li className="navbar-item">Services</li>
                                    <li className="navbar-item">Companies</li>
                                <button className="navbar-button" onClick={handleOpenModal}>Login</button>
                                </ul>
                            </div>
                        </nav>
                </div>
            </section>
            <Modal show={modalOpen} handleClose={handleCloseModal} />
            <section>
                <div className="hero-container">
                    <div className="heroe-image">
                        <div className="heroe-overlay">
                            <div className="hero-text">
                                <h1>Discover {heading[currentTextIndex]} Transportation solution</h1>
                            </div>
                            <div className="main-booking-container">
                                <div className="booking-container">
                                    <div className="booking-items"><input placeholder='Leaving from' type="text"/></div>
                                    <div className="booking-items"><input placeholder='Going to' type="text"/></div>
                                    <div className="booking-items"><input type="month" placeholder='Leaving On'/></div>
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
    )
}

export default Homepage;