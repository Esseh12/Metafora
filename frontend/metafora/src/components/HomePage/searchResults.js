import React, { useEffect, useState } from 'react';
import Navbar from '../HomePage/navbar';
import Footer from '../HomePage/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/searchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const { leavingFrom, goingTo } = location.state || { leavingFrom: '', goingTo: '' };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [query_data, setQueryData] = useState([]);
    const [showEmptyQuery, setEmptyQuery] = useState('')



    // const dummyResults = [
    //     { id: 1, company: 'GUO', route: `${leavingFrom} to ${goingTo}`, time: '8:00 AM', price: '₦5000' },
    //     { id: 2, company: 'GIG', route: `${leavingFrom} to ${goingTo}`, time: '10:00 AM', price: '₦5500' },
    //     { id: 3, company: 'Enzewanta', route: `${leavingFrom} to ${goingTo}`, time: '12:00 PM', price: '₦5300' },
    // ];

    useEffect(() => {
        fetch(`http://localhost:5000/journeys_search?from_state=${leavingFrom}&to_state=${goingTo}`)
        .then(res=> res.json())
        .then(data=> {
            if (data['status'] !== 200){
                throw new Error(data['error'])                
            }
            console.log(data['data'])
            setQueryData(data['data']);
        })
        .catch(err => {
            console.log(err.message)

            setEmptyQuery(err.message)
            // console.log(err);
        })
    }, [])

    const handleCompanyClick = (journey_id) => {

        setLoading(true);
        setTimeout(() => {
            // navigate('/bus-details', { state: { company, leavingFrom, goingTo } });            
            navigate('/bus-details', { state: { journey_id } });

        }, 1000);
    };

    return (
        <>
            <Navbar />
            <div className="results-page">
                <h2>Available Routes from {leavingFrom} to {goingTo}</h2>
                {loading ? (
                    <p>Searching for buses...</p>
                ) : (
                    <div className="results-container">
                        {/* {dummyResults.map(result => ( */}
                        {query_data.map(result => (
                            <div key={result.id} className="result-item" onClick={() => handleCompanyClick(result.id)}>
                                <p>Company: {result.company_info.name}</p>
                                <p>Route: {result.name}</p>
                                <p>Time: {result.time}</p>
                                <p>Price: {result.price}</p>
                            </div>
                        ))}
                        <p>{showEmptyQuery}</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchResults;
