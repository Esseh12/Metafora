import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/busDetails.css';
import SeatSelection from './SeatSelection';

const BusDetails = () => {
    const location = useLocation();
    const { journey_id } = location.state;
    const [journeyData, setJourneyData] = useState({});
    const [showSeatSelection, setShowSeatSelection] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/journey/${journey_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 200) {
                    throw new Error(data.error);
                }
                setJourneyData(data.data);
            })
            .catch(err => console.log(err.message));
    }, [journey_id]);

    const handleSelectSeat = () => {
        setShowSeatSelection(true);
    };

    if (!journey_id) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bus-details-page">
            <div className="bus-details-container">
                <div className="bus-details-content">
                    <h2>Bus Details</h2>
                    <div className="bus-details">
                        <p>Company: {journeyData.company}</p>
                        <p>Route: {journeyData.route}</p>
                        <p>Time: {journeyData.time}</p>
                        <p>Price: ₦{journeyData.price}</p>
                        <p>From: {journeyData.from_park}</p>
                        <p>To: {journeyData.to_park}</p>
                        <button className="select-seat-button" onClick={handleSelectSeat}>Select Seat</button>
                    </div>
                </div>
                {showSeatSelection && <SeatSelection onClose={() => setShowSeatSelection(false)} selectedBus={journeyData} />}
            </div>
        </div>
    );
};

export default BusDetails;
