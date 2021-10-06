import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [carData, setCarData] = useState([]);
    const [pagination, setPagination] = useState();

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];

    const trimTitle = (make, model) => {
        let title = make + model;

        return model + "/" + title.length;
    };

    useEffect(() => {
        axios
            .get("/cars")
            .then((res) => {
                const { data, ...pagination } = res.data;

                setCarData(data);
                setPagination(pagination);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="home-page">
            <section
                className="hero"
                style={{
                    backgroundImage: `url(/storage/images/${
                        homeImages[Math.floor(Math.random() * 2) + 1]
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></section>

            <section className="car-list car-drive-container">
                {carData.length != 0 && (
                    <>
                        {carData.map((car, index) => (
                            <div
                                className="car-card"
                                key={index}
                                style={{
                                    backgroundImage: `url(/storage/images/${
                                        homeImages[
                                            Math.floor(Math.random() * 2) + 1
                                        ]
                                    })`,
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
                        ))}
                    </>
                )}
            </section>
        </div>
    );
};

export default Home;
