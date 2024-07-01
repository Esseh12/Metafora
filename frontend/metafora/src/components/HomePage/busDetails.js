import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import '../../styles/busDetails.css';

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

    const dummyBusDetails = {
        id: 1,
        company: 'comapny',
        route: `leavingFrom goingTo`,
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
                <p>Company: {journey_data.company}</p>
                <p>Route: {journey_data.route}</p>
                <p>Time: {journey_data.time}</p>
                <p>Price: {journey_data.price}</p>
                {/* <p>Seats Available: 10{dummyBusDetails.seatsAvailable}</p> */}
                <button onClick={handleSelectSeats}>Select Seats</button>
            </div>
            {showSeatSelection && (
                <SeatSelection onClose={handleCloseSeatSelection} />
            )}
        </div>
    );
};

export default BusDetails;
