import { IoBus } from "react-icons/io5";
import { FaChair } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaTicketAlt } from "react-icons/fa";
import mockup from '../images/mockup.png';
import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/homepage.css';
import Navbar from "./navbar";


const Homepage = () => {
    const heading = ['Efficient', 'Reliable', 'Simplified'];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    useEffect(() => {const intervalId = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % heading.length);
        }, 2500); // Change text every 2.5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [heading.length])

    return (
        <>
            <Navbar />
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
            <section class="section2">
                <div class="steps-in-booking">
                    <div><h1 class="section2-heading">Book your ticket in 4 steps</h1></div>
                    <div class="section2-container">
                        <div class="section2-bus-container icon-containers">
                            <div class="busIcon section2-icon"><IoBus className="icons" /></div>
                            <div className="icon-text">
                                <h3>Search for buses</h3>
                                <p>Select from a wide range of options</p>
                            </div>
                        </div>
                        <div className="icon-containers">
                            <div class="section2-icon"><FaChair className="icons" /></div>
                            <div className="icon-text">
                                <h3>Select Seat</h3> 
                                <p>Choose your preferred seat from the<br />comfort of your phone </p>
                            </div>
                        </div>
                        <div className="icon-containers">
                            <div class="section2-icon"><MdOutlinePayment className="icons" /></div>
                            <div className="icon-text">
                                <h3>Make Payment</h3>
                                <p>a wide variety of payment option<br />the choice is yours</p>
                            </div>
                        </div>
                        <div className="icon-containers">
                            <div class="section2-icon"><FaTicketAlt className="icons" /></div>
                            <div className="icon-text">
                                <h3>Recieve ticket</h3>
                                <p>Your ticket details will be sent <br/>to your email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="aboutPage-section">
                <div>
                    <div className="aboutPage-buttons">
                        <button onClick={() => { alert('why disturbing me'); }}>Customers</button>
                        <button>Partners</button>
                    </div>
                    <div className="aboutPage-content">
                        <div className="aboutPage-text">
                            <div className="aboutPage-subcontent">
                                <h1>Simplify your journey with Metafora</h1>
                                <span><p><TiTick className="tick"/>Effortlessly connect with top transportation providers for a smooth journey</p></span>
                            </div>
                            <div className="aboutPage-subcontent">
                                <h1>Discover Reliable Solutions</h1>
                                <span><p><TiTick className="tick"/>Compare and choose the best transportation options for your needs with ease.</p></span>
                            </div>
                            <div className="aboutPage-subcontent">
                                <h1>Seamless and Convenient</h1>
                                <span><p><TiTick className="tick"/>Experience a hassle-free booking process for all your transportation requirements in one place.</p></span>
                            </div>
                        </div>
                        <div className="mockup-image">
                            <img src={mockup} alt="mock up from mobile app" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <div>
                       
                    </div>
                </div>
            </section>
        </>
    )
}

export default Homepage;