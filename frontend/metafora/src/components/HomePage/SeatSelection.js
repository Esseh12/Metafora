import React from 'react';
import '../../styles/seatSelection.css';

const SeatSelection = ({ onClose }) => {
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

    return (
        <div className="seat-selection-overlay">
            <div className="seat-selection-popup">
                <h2>Select Seat(s)</h2>
                <div className="seat-selection-grid">
                    {seats.map(seat => (
                        <div key={seat.id} className={`seat ${seat.status}`}>
                            {seat.id}
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SeatSelection;
