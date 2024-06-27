import React, { useState } from 'react';
import '../styles/companies.css';

const Companies = () => {
    // for listing banner
    const [showMessage, setShowMessage] = useState(false);

    const handleAddListingClick = () => {
        setShowMessage(true);
    };

    const [companies, /*setCompanies */] = useState([
        { id: 1, name: "Company One", description: "Leading in technology solutions", url: "/company-one" },
        { id: 2, name: "Company Two", description: "Innovative healthcare services", url: "/company-two" },
        { id: 3, name: "Company Three", description: "Top-tier logistics and transport", url: "/company-three" },
    ]);

    // Future implementation to fetch data from an API
    // useEffect(() => {
    //     fetch('/api/companies')
    //         .then(response => response.json())
    //         .then(data => setCompanies(data))
    //         .catch(error => console.error('Error fetching companies:', error));
    // }, []);

    return (
        <>
            <section id="companies-section">
                <div className="listing-banner">
                    <div className="listing-banner-content">
                        <h1>Are you a Bus Operator?</h1>
                        <p>Earn more by listing on Metafora</p>
                        <button onClick={handleAddListingClick}>Add Listing</button>
                        {showMessage && (
                            <div className="message">
                                <p>Feature is not available. To register, send an email to <a href="mailto:gbenmoese788@gmail.com">gbenmoese788@gmail.com</a></p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="companies-section">
                <div className="companies-container">
                    {companies.map(company => (
                        <div key={company.id} className="company-box">
                            <h2>{company.name}</h2>
                            <p>{company.description}</p>
                            <a href={company.url} className="company-link">Visit Company →</a>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Companies;
