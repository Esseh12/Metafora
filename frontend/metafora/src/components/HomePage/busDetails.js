import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/busDetails.css';
import SeatSelection from './SeatSelection';

const BusDetails = () => {
    const location = useLocation();
    // const { company, leavingFrom, goingTo } = location.state || { company: '', leavingFrom: '', goingTo: '' };
    const { journey_id } = location.state  //|| { company: '', leavingFrom: '', goingTo: '' };
    const [journey_data, setJourneyData] = useState({});


    const [showSeatSelection, setShowSeatSelection] = useState(false);

    // console.log('from busdetails page: ');
    // console.log(journey_data);
    // console.log('from busdetails page: ');

    useEffect(()=>{
        fetch(`http://localhost:5000/journey/${journey_id}`)
            .then(res=> res.json())
            .then(data=> {
                if (data['status'] !== 200){
                    throw new Error(data['error']);               
                }
                // console.log(`from searchresults: ${data['data']}`);
                setJourneyData(data['data']);
            })
            .catch(err => {
                console.log(err.message)

                // setEmptyQuery(err.message)
                // console.log(err);
            })

    },[])

    // const dummyBusDetails = {
    //     id: 1,
    //     company: 'comapny',
    //     route: `leavingFrom goingTo`,
    //     time: '8:00 AM',
    //     price: '₦5000',
    //     seatsAvailable: 10,
    // };

    // const handleSelectSeats = () => {
    // const { bus } = location.state || {};
    // const [showSeatSelection, setShowSeatSelection] = useState(false);

    const handleSelectSeat = () => {
        setShowSeatSelection(true);
    };

    if (!journey_id) {
        return <p>Loading...</p>; // or any other loading indicator
    }

    return (
        <div className="bus-details-page">
            <h2>Bus Details</h2>
            <div className="bus-details">
                <p>Company: {journey_data.company}</p>
                <p>Route: {journey_data.route}</p>
                <p>Time: {journey_data.time}</p>
                <p>Price: ₦{journey_data.price}</p>
                <p>From: {journey_data.from_park}</p>
                <p>To: {journey_data.to_park}</p>
                {/* <p>Seats Available: 10{dummyBusDetails.seatsAvailable}</p> */}
                <button onClick={handleSelectSeat}>Select Seat</button>
                {/* {showSeatSelection && <SeatSelection onClose={() => setShowSeatSelection(false)} selectedBus={bus} />} */}
                {showSeatSelection && <SeatSelection onClose={() => setShowSeatSelection(false)} selectedBus={journey_data} />}
            </div>
            {/* <div className="bus-details">
                <h2>{bus.company}</h2>
                <p>{bus.route}</p>
                <p>{bus.time}</p>
                <p>{bus.price}</p>
                
                <button onClick={handleSelectSeat}>Select Seat</button>
                {showSeatSelection && <SeatSelection onClose={() => setShowSeatSelection(false)} selectedBus={bus} />}
            </div> */}
        </div>
    );
};

export default BusDetails;
