import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/payment.css';




const Payment = () => {
    const location = useLocation();
    const { selectedSeat, busDetails } = location.state || {};
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const navigate = useNavigate();


    const handlePayment = (event) => {
        event.preventDefault();
        const dt = {...busDetails, user: localStorage.getItem('userID')}
        
        setPaymentStatus('processing');

        const token = localStorage.getItem('accessToken');
        
        


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
                }, 2000);
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
            <div className="payment-container">
                {paymentStatus === 'pending' && (
                    <form onSubmit={handlePayment}>
                        <h2>Payment Details</h2>
                        <p>Selected Seat: {selectedSeat}</p>
                        <p>Bus Company: {busDetails.company}</p>
                        <p>Total Price: ₦{busDetails.price}</p>
                        {/* <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div> */}
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
                        <button type="submit">Pay</button>
                    </form>
                )}
                {paymentStatus === 'processing' && <p>Confirming payment...</p>}
                {paymentStatus === 'confirmed' && (
                    <div>
                        <p>Receipt has been sent to your mail. Thank you for using Metafora!</p>
                        <button onClick={handleConfirmationClose}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
