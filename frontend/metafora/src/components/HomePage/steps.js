import "../../styles/homepage.css";
import { IoBus } from "react-icons/io5";
import { FaChair } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";

const Steps = () => {

    return(
<>
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
    </section >
</>
)
}

export default Steps;