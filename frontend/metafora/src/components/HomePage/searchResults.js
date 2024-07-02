import React, { useState } from 'react';
import Navbar from '../HomePage/navbar';
import Footer from '../HomePage/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/searchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const { leavingFrom, goingTo } = location.state || { leavingFrom: '', goingTo: '' };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const dummyResults = [
        { id: 1, company: 'GUO', route: `${leavingFrom} to ${goingTo}`, time: '8:00 AM', price: '₦5000', fromParkAddress: "Hans", toParkAddress: "Rene" },
        { id: 2, company: 'GIG', route: `${leavingFrom} to ${goingTo}`, time: '10:00 AM', price: '₦5500', fromParkAddress: "Hans", toParkAddress: "Rene" },
        { id: 3, company: 'Enzewanta', route: `${leavingFrom} to ${goingTo}`, time: '12:00 PM', price: '₦5300', fromParkAddress: "Hans", toParkAddress: "Rene" },
    ];

    const handleCompanyClick = (bus) => {
        setLoading(true);
        setTimeout(() => {
            navigate('/bus-details', { state: { bus } });
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
                        {dummyResults.map(result => (
                            <div key={result.id} className="result-item" onClick={() => handleCompanyClick(result)}>
                                <p>Company: {result.company}</p>
                                <p>Route: {result.route}</p>
                                <p>Time: {result.time}</p>
                                <p>Price: {result.price}</p>
                                <p>From: {result.fromParkAddress}</p>
                                <p>To: {result.toParkAddress}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchResults;
