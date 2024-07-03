import React from 'react';
import '../../styles/testimonies.css';
import oluchiDavies from "../../images/oluchiDavies.jpeg";
import sharonIzuchukwu from "../../images/sharonIzuchukwu.webp";
import adamaGarba from "../../images/adamuGarba.webp";
import danielOmori from "../../images/danielOmori.jpeg";

const Testimonies = () => {
    const testimonies = [
        { id: 1, type: "customer", name: "Oluchi Davies", text: "Metafora made my journey so smooth and hassle-free. Highly recommended!", image: oluchiDavies },
        { id: 2, type: "customer", name: "Jide Badmus", text: "I love the seamless booking process on Metafora. It's so easy and convenient.", image: adamaGarba },
        { id: 3, type: "partner", name: "Sharon Ihemadu", text: "Partnering with Metafora has boosted my business tremendously.", image: sharonIzuchukwu },
        { id: 4, type: "partner", name: "Daniel Omori", text: "The best platform for transportation partners. Efficient and effective.", image: danielOmori },
    ];

    return (
        <section className="testimonies-section">
            <h2>What Our Users Say</h2>
            <div className="testimonies-container">
                {testimonies.map(testimony => (
                    <div key={testimony.id} className="testimony-box">
                        <img src={testimony.image} alt={testimony.name} className="testimony-image" />
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
