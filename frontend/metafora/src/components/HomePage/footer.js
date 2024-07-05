import React from 'react';
import '../../styles/footer.css';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import playStoreImg from '../../images/PlaystoreImg.png';
import appleStoreImg from '../../images/applePlayStoreImg.png';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2>Metafora</h2>
                    <p>Your go-to platform for seamless transportation solutions.</p>
                </div>
                <div className="footer-section">
                    <h3 className="app-links__h3">Download Our App</h3>
                    <div className="app-links">
                        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                           <img src={playStoreImg} alt="Download from Google play store" />
                        </a>
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                            <img src={appleStoreImg} alt="Download from app store" />
                        </a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3 className="social-media-h3">Follow Us</h3>
                    <div className="social-media-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                           <FaFacebookSquare  className="social-media-icons"/>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareXTwitter className="social-media-icons"/>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaSquareInstagram className="social-media-icons"/>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                           <FaLinkedin className="social-media-icons"/>
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
