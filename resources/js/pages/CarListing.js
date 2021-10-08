import React, { useEffect ,useState } from "react";
import CarCard from "../components/CarCard";

import { useDispatch, useSelector } from "react-redux";

import { loadCars } from "../actions/GeneralAppActions";

import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const CarListing = ({ fullMode = true , inAdmin = false}) => {
    const dispatch = useDispatch();

    const AppCars = useSelector((state) => state.appCars);


    const { cars, pagination } = AppCars;

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];

    const trimTitle = (make, model) => {
        let title = make + model;

        return model + "/" + title.length;
    };

    const getPage = (pageUrl) => {
        dispatch(loadCars(pageUrl));
    };

    useEffect(() => {
        dispatch(loadCars(inAdmin ? "/auth/cars" : "/cars"));
    }, []);





    return (
        <section className="car-list-wrapper">
            <div className="list-header car-drive-container">
                <h1>Top Listings</h1>

                {!fullMode ? (
                    <Link to="/listing">
                        More <i className="ti-arrow-right"></i>
                    </Link>
                ) : (
                    <span>{`Page ${pagination?.meta?.current_page ?? "First"} of ${
                        pagination?.meta?.last_page ?? "Last"
                    }`}</span>
                )}
            </div>
            <section className="car-list car-drive-container">
                {cars?.length != 0 && (
                    <>
                        {cars?.map((car, index) => (
                            <CarCard
                                inAdmin={inAdmin}
                                car={car}
                                key={index}
                                bgImg={`url(/storage/images/${
                                    homeImages[Math.floor(Math.random() * 2)]
                                })`}
                            />
                        ))}
                    </>
                )}
            </section>

            {fullMode && (<Pagination
                getPage={getPage}
                currentPage={pagination?.meta?.current_page}
                inLastPage={!pagination?.links?.next}
                inFirstPage={!pagination?.links?.prev}
                links={pagination?.meta?.links}
                nextPage={pagination?.links?.next}
                prevPage={pagination?.links?.prev}
            />)}
        </section>
    );
};

export default CarListing;
