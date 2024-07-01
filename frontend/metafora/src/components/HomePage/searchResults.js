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
        { id: 1, company: 'GUO', route: `${leavingFrom} to ${goingTo}`, time: '8:00 AM', price: '₦5000' },
        { id: 2, company: 'GIG', route: `${leavingFrom} to ${goingTo}`, time: '10:00 AM', price: '₦5500' },
        { id: 3, company: 'Enzewanta', route: `${leavingFrom} to ${goingTo}`, time: '12:00 PM', price: '₦5300' },
    ];

    const handleCompanyClick = (company) => {
        setLoading(true);
        setTimeout(() => {
            navigate('/bus-details', { state: { company, leavingFrom, goingTo } });
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
                            <div key={result.id} className="result-item" onClick={() => handleCompanyClick(result.company)}>
                                <p>Company: {result.company}</p>
                                <p>Route: {result.route}</p>
                                <p>Time: {result.time}</p>
                                <p>Price: {result.price}</p>
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
