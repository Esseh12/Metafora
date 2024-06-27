import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import logo from '../images/logo-icon.ico';
import Modal from './modal';
import '../styles/navbar.css';

const Navbar = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <>
            <section className="navbar-section">
                <div className="navbar-overlay">
                    <nav className="navbar">
                        <div className="logo-container">
                            <img src={logo} alt="Metafora logo" className="navbar-logo" />
                            <span className="logo-text">Metafora</span>
                        </div>
                        <div className="navbar-text">
                            <div className="desktop-menu">
                                <ul className="navbar-list">
                                    <li className="menu-item navbar-item"><a href="./" className="navbar-link">Home</a></li>
                                    <li className="menu-item navbar-item"><a href="#aboutPage-section" className="navbar-link">About</a></li>
                                    <li className="menu-item navbar-item"><a href="#services-section" className="navbar-link">Services</a></li>
                                    <li className="menu-item navbar-item"><a href="#companies-section" className="navbar-link">Companies</a></li>
                                    <button className="menu-item navbar-button" onClick={handleOpenModal}>Login</button>
                                </ul>
                            </div>
                            <div className="mobile-menu">
                                <Menu right>
                                    <a className="menu-item" href="/">Home</a>
                                    <a href="#aboutPage-section" className="menu-item">About</a>
                                    <a href="#services-section" className="menu-item">Services</a>
                                    <a href="#companies-section" className="menu-item">Companies</a>
                                    <button className="menu-item navbar-button" onClick={handleOpenModal}>Login</button>
                                </Menu>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
            <Modal show={modalOpen} handleClose={handleCloseModal} />
        </>
    );
}

export default Navbar;
