import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../../styles/navbar.css';

const Navbar = () => {

    const navigate = useNavigate();

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
                                    <button className="menu-item navbar-button" onClick={() => navigate('/login')}>Login</button>
                                </ul>
                            </div>
                            <div className="mobile-menu">
                                <Menu right>
                                    <a className="menu-item" href="/">Home</a>
                                    <a href="#aboutPage-section" className="menu-item">About</a>
                                    <a href="#services-section" className="menu-item">Services</a>
                                    <a href="#companies-section" className="menu-item">Companies</a>
                                    <button className="menu-item navbar-button" onClick={() => navigate('/login')}>Login</button>
                                </Menu>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    );
}

export default Navbar;
