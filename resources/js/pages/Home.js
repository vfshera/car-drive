import axios from "axios";
import React, { useEffect, useState } from "react";
import CarCard from '../components/CarCard';

import {useDispatch,useSelector} from 'react-redux'

import { loadCars } from '../actions/GeneralAppActions'


const Home = () => {

const dispatch = useDispatch();

const AppCars =   useSelector(state => state.appCars)

const { cars , pagination } = AppCars;


    // const [carData, setCarData] = useState([]);
    // const [pagination, setPagination] = useState();

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];

    const trimTitle = (make, model) => {
        let title = make + model;

        return model + "/" + title.length;
    };

    useEffect(() => {

        dispatch(loadCars())

        // axios
        //     .get("/cars")
        //     .then((res) => {
        //         const { data, ...pagination } = res.data;

        //         setCarData(data);
        //         setPagination(pagination);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
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

            <section className="car-list-wrapper">

                <h1 className="car-drive-container">Top Listings</h1>
            <section className="car-list car-drive-container">
                {cars.length != 0 && (
                    <>
                        {cars.map((car, index) => (
                            <CarCard 
                            car={car} 
                            index={index} 
                            bgImg={`url(/storage/images/${
                                        homeImages[
                                            Math.floor(Math.random() * 2) + 1
                                        ]
                                    })`} />
                        ))}
                    </>
                )}
            </section>
            </section>
        </div>
    );
};

export default Home;
