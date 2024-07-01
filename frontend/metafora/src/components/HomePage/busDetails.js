import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import '../../styles/busDetails.css';

const BusDetails = () => {
    const location = useLocation();
    const { company, leavingFrom, goingTo } = location.state || { company: '', leavingFrom: '', goingTo: '' };
    const [showSeatSelection, setShowSeatSelection] = useState(false);

    const dummyBusDetails = {
        id: 1,
        company,
        route: `${leavingFrom} to ${goingTo}`,
        time: '8:00 AM',
        price: '₦5000',
        seatsAvailable: 10,
    };

    const handleSelectSeats = () => {
        setShowSeatSelection(true);
    };

    const handleCloseSeatSelection = () => {
        setShowSeatSelection(false);
    };

    return (
        <div className="bus-details-page">
            <h2>Bus Details</h2>
            <div className="bus-details">
                <p>Company: {dummyBusDetails.company}</p>
                <p>Route: {dummyBusDetails.route}</p>
                <p>Time: {dummyBusDetails.time}</p>
                <p>Price: {dummyBusDetails.price}</p>
                <p>Seats Available: {dummyBusDetails.seatsAvailable}</p>
                <button onClick={handleSelectSeats}>Select Seats</button>
            </div>
            {showSeatSelection && (
                <SeatSelection onClose={handleCloseSeatSelection} />
            )}
        </div>
    );
};

export default BusDetails;
