import axios from "axios";
import React, { useEffect } from "react";
import CarCard from '../components/CarCard';

import {useDispatch,useSelector} from 'react-redux'

import { loadCars } from '../actions/GeneralAppActions'

import { Link } from "react-router-dom";
import CarListing from "./CarListing";


const Home = () => {



    const homeImages = ["car-one.webp", "car-two.webp", "car-three.webp"];

    const trimTitle = (make, model) => {
        let title = make + model;

        return model + "/" + title.length;
    };

    useEffect(() => {


    }, []);

    return (
        <div className="home-page">
            <section
                className="hero"
                style={{
                    backgroundImage: `url(/storage/images/${
                        homeImages[
                            Math.floor(Math.random() * 3)
                        ]
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></section>

            <CarListing fullMode={false}/>          



        </div>
    );
};

export default Home;
