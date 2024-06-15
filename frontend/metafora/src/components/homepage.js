import logo from '../images/logo-icon.ico';
import React from 'react-dom';
import { useState } from 'react';
import Modal from './modal';
import '../styles/homepage.css';

const Homepage = () => {
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
                                    <li className="navbar-item">About Us</li>
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
                <div>
                    <div class="">
                        <div class="heroe-image">
                            <div class="heroe-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Homepage;