import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/busDetails.css';
import SeatSelection from './SeatSelection';
import Navbar from '../HomePage/navbar';
import Footer from '../HomePage/footer';
import jetMover from '../../images/jetmover.png';
import { RiRadioButtonFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { GiCarSeat } from "react-icons/gi";
import { GoClockFill } from "react-icons/go";

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
        <>
        <Navbar />
        <div className="bus-details-page">
            <div className="bus-details-container">
                    <div className="bus-details-content">
                        <div className='img__div'> 
                            <img src={jetMover} alt="jetmover bus" />  
                        </div>
                        <div className="bus-details">
                            <h3>JET&nbsp;(Jet Mover)</h3>
                            {/* <p>Company: {journeyData.company}</p> */}
                            {/* <p>Price: ₦{journeyData.price}</p> */}
                            <div className="journey__div first_container">
                                <span><RiRadioButtonFill /></span>
                                <p>Departure: {journeyData.from_park} </p>
                            </div>
                            <div className="journey__div second_container">
                                <span><MdLocationOn /></span>
                                <p>Arrival: {journeyData.to_park}</p>
                            </div>
                            <div className="journey__div third_container">
                                <div className='journey__sub__div'>
                                    <span><GiCarSeat /></span>
                                    <p>9 seats(avaliable)</p>
                                </div>
                                <div className='journey__sub__div second_sub_container'>
                                    <span><GoClockFill /></span>
                                    <p>{journeyData.time}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='journey__price__div'>
                            <h3>₦{journeyData.price}</h3>
                            <button className="select-seat-button" onClick={handleSelectSeat}>Select Seat</button>
                        </div>
                    </div>
                </div>
                {showSeatSelection && <SeatSelection onClose={() => setShowSeatSelection(false)} selectedBus={journeyData} />}
            <Footer />
        </>
    );
};

export default BusDetails;
