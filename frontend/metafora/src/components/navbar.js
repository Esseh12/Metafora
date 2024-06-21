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
                                    <li className="menu-item navbar-item">Home</li>
                                    <li className="menu-item navbar-item">About</li>
                                    <li className="menu-item navbar-item">Services</li>
                                    <li className="menu-item navbar-item">Companies</li>
                                    <button className="menu-item navbar-button" onClick={handleOpenModal}>Login</button>
                                </ul>
                            </div>
                            <div className="mobile-menu">
                                <Menu right>
                                    <a className="menu-item" href="/">Home</a>
                                    <a className="menu-item" href="/about">About</a>
                                    <a className="menu-item" href="/services">Services</a>
                                    <a className="menu-item" href="/companies">Companies</a>
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
