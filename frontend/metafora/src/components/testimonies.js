import React from 'react';
import '../styles/testimonies.css';

const Testimonies = () => {
    const testimonies = [
        { id: 1, type: "customer", name: "Jane Doe", text: "Metafora made my journey so smooth and hassle-free. Highly recommended!" },
        { id: 2, type: "customer", name: "John Smith", text: "I love the seamless booking process on Metafora. It's so easy and convenient." },
        { id: 3, type: "customer", name: "Emily Johnson", text: "Finding reliable transportation has never been easier. Thanks, Metafora!" },
        { id: 4, type: "partner", name: "Michael Brown", text: "Partnering with Metafora has boosted my business tremendously. Great platform!" },
        { id: 5, type: "partner", name: "Sarah Wilson", text: "The best platform for transportation partners. Efficient and effective." },
        { id: 6, type: "partner", name: "David Lee", text: "Metafora has connected me with so many clients. Couldn't be happier!" },
    ];

    return (
        <section className="testimonies-section">
            <h2>What Our Users Say</h2>
            <div className="testimonies-container">
                {testimonies.map(testimony => (
                    <div key={testimony.id} className="testimony-box">
                        <p className="testimony-text">"{testimony.text}"</p>
                        <p className="testimony-author">- {testimony.name}</p>
                        <span className={`testimony-type ${testimony.type}`}>{testimony.type}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonies;
