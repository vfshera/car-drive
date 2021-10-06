import React from "react";

const CarCard = ({ car, index, bgImg }) => {
    return (
        <div
            className="car-card"
            key={index}
            style={{
                backgroundImage: bgImg,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="caption-wrapper">
                <div className="caption">
                    <div className="title">
                        <h2>{car.make}</h2>
                    </div>
                    <div className="description">
                        <h2>{car.model}</h2>
                        <h3>{car.year}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
