import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/payment.css';
import { PiCreditCardFill } from "react-icons/pi";
import Navbar from '../HomePage/navbar';
import Footer from '../HomePage/footer';

const Payment = () => {
    const location = useLocation();
    const { selectedSeat, busDetails } = location.state || {};
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const navigate = useNavigate();

    const handlePayment = (event) => {
        event.preventDefault();
        const dt = { ...busDetails, user: localStorage.getItem('userID') };

        setPaymentStatus('processing');

        const token = localStorage.getItem('accessToken');

        // fetch('http://localhost:5000/tickets/create', {
        fetch('https://metafora.pythonanywhere.com/tickets/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: "Cofounder", passenger_id: dt.user, journey_id: dt.journey_id, price: dt.price, seat_number: selectedSeat })
        })
        .then(response => response.json())
        .then(data => {
            if (data['status'] !== 201){
                throw new Error(`${data['msg']}`);
            } else {
                setTimeout(() => {
                    setPaymentStatus('confirmed');
                }, 4000);
            }
        })
        .catch(error => {
            alert(`${error}.`);
        });
    };

    const handleConfirmationClose = () => {
        setPaymentStatus('pending');
        navigate('/');
    };

    return (
        <div className="payment-page">
            <Navbar />
            {paymentStatus === 'pending' && (
                <form onSubmit={handlePayment}>
                    <div className="payment-container">
                        <div className='payment_form_container'>
                            <span className="credit__card"><PiCreditCardFill /></span>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" name="cardNumber" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" name="expiryDate" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" required />
                            </div>
                        </div>
                        <div className='trip_summary_subcontainer one'>
                            <h2>Trip Summary</h2>
                            <div className='trip_sumamry_small'><p>Bus Company:</p><p>{busDetails.company}</p></div>
                            <div className='trip_sumamry_small'><p>From:</p><p>{busDetails.from_park}</p></div>
                            <div className='trip_sumamry_small'><p>To:</p><p>{busDetails.to_park}</p></div>
                            <div className='trip_sumamry_small'><p>Time:</p><p>{busDetails.time}</p></div>
                            <div className='trip_sumamry_small'><p>Seat number:</p><p>{selectedSeat}</p></div>
                            <div className='trip_sumamry_small'><p>Total Price:</p><p> ₦{busDetails.price}</p></div>
                            <div className='button_container'><button type="submit">Pay</button></div>
                        </div>
                    </div>
                </form>
            )}
            {paymentStatus === 'processing' && <p className="processing-message">Hold on while we confirm your payment...</p>}
            {paymentStatus === 'confirmed' && (
                <div className="payment-overlay">
                    <div className="payment-popup">
                        <h2>Thank You!</h2>
                        <p>Receipt has been sent to your mail. Thank you for using Metafora!</p>
                        <button onClick={handleConfirmationClose}>Close</button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Payment;
