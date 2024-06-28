import React from 'react';
import Navbar from '../HomePage/searchResults';
import Footer from '../HomePage/footer';
import { useLocation } from 'react-router-dom'; // Importing useLocation hook from react-router-dom to access current location
import '../../styles/searchResults.css'; // Importing CSS styles for SearchResults component

const SearchResults = () => {
    const location = useLocation(); // Using useLocation hook to get current location object
    const { leavingFrom, goingTo } = location.state; // Destructuring leavingFrom and goingTo from location.state

    // Dummy data for search results
    const dummyResults = [
        { id: 1, company: 'GUO', route: `${leavingFrom} to ${goingTo}`, time: '8:00 AM', price: '₦5000' }, // Example result with interpolated leavingFrom and goingTo
        { id: 2, company: 'GIG', route: `${leavingFrom} to ${goingTo}`, time: '10:00 AM', price: '₦5500' }, // Example result with interpolated leavingFrom and goingTo
        { id: 3, company: 'Enzewanta', route: `${leavingFrom} to ${goingTo}`, time: '12:00 PM', price: '₦5300' }, // Example result with interpolated leavingFrom and goingTo
    ];

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="results-page"> {/* Start of results-page section */}
                <h2>Available Routes from {leavingFrom} to {goingTo}</h2> {/* Displaying heading with leavingFrom and goingTo */}
                 <div className="results-container"> {/* Start of results-container div */}
                    {dummyResults.map(result => ( // Mapping through dummyResults array to render each result
                        <div key={result.id} className="result-item"> {/* Each result-item div */}
                            <p>Company: {result.company}</p> {/* Displaying company */}
                            <p>Route: {result.route}</p> {/* Displaying route */}
                            <p>Time: {result.time}</p> {/* Displaying time */}
                            <p>Price: {result.price}</p> {/* Displaying price */}
                        </div>
                    ))} 
                </div> {/* End of results-container div */}
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default SearchResults; // Exporting SearchResults component
