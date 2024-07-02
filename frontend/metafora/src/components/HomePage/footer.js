import React from 'react';
import '../../styles/footer.css';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2>Metafora</h2>
                    <p>Your go-to platform for seamless transportation solutions.</p>
                </div>
                <div className="footer-section">
                    <h3>Download Our App</h3>
                    <div className="app-links">
                        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                            <img src="path/to/playstore.png" alt="Play Store" />
                        </a>
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                            <img src="path/to/appstore.png" alt="App Store" />
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-media-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="path/to/facebook.png" alt="Facebook" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareXTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                           <FaLinkedin />
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Metafora. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
