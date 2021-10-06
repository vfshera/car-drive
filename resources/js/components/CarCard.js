import React from "react";
import { Link } from 'react-router-dom'

const CarCard = ({ car, index, bgImg }) => {

    let viewlink = `${car.id}-${car.slug}`;

    return (
       <Link to={viewlink}>

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

       </Link>
    );
};

export default CarCard;
