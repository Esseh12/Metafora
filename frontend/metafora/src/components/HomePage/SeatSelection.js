import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/seatSelection.css';

const SeatSelection = ({ onClose, selectedBus }) => {
    const navigate = useNavigate();
    const [selectedSeat, setSelectedSeat] = useState(null);

    const seats = [
        { id: 1, status: 'available' },
        { id: 2, status: 'booked' },
        { id: 3, status: 'available' },
        { id: 4, status: 'available' },
        { id: 5, status: 'booked' },
        { id: 6, status: 'available' },
        { id: 7, status: 'available' },
        { id: 8, status: 'available' },
        { id: 9, status: 'booked' },
        { id: 10, status: 'available' },
        { id: 11, status: 'available' },
        { id: 12, status: 'available' },
    ];

    const isLoggedIn = () => {
        // Replace with actual authentication check
        return !!localStorage.getItem('userToken');
    };

    const handleSeatClick = (seat) => {
        if (seat.status === 'available') {
            setSelectedSeat(seat.id);
            if (isLoggedIn()) {
                navigate('/payment', { state: { selectedSeat: seat.id, busDetails: selectedBus } });
            } else {
                navigate('/signup-signin', { state: { selectedSeat: seat.id, busDetails: selectedBus } });
            }
        }
    };
    
    return (
        <div className="seat-selection-overlay">
            <div className="seat-selection-popup">
                <h2>Select Seat(s)</h2>
                <div className="seat-selection-grid">
                    {seats.map(seat => (
                        <div
                            key={seat.id}
                            className={`seat ${seat.status} ${selectedSeat === seat.id ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {seat.id}
                        </div>
                    ))}
                </div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SeatSelection;
