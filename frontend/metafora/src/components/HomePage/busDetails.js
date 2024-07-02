import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/busDetails.css';
import SeatSelection from './SeatSelection';

const BusDetails = () => {
    const location = useLocation();
    const { bus } = location.state || {};
    const [showSeatSelection, setShowSeatSelection] = useState(false);

    const handleSelectSeat = () => {
        setShowSeatSelection(true);
    };

    if (!bus) {
        return <p>Loading...</p>; // or any other loading indicator
    }

    return (
        <div className="bus-details">
            <h2>{bus.company}</h2>
            <p>{bus.route}</p>
            <p>{bus.time}</p>
            <p>{bus.price}</p>
            <button onClick={handleSelectSeat}>Select Seat</button>
            {showSeatSelection && <SeatSelection onClose={() => setShowSeatSelection(false)} selectedBus={bus} />}
        </div>
    );
};

export default BusDetails;
