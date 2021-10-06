import React, { useEffect ,useState } from "react";
import CarCard from "../components/CarCard";

import { useDispatch, useSelector } from "react-redux";

import { loadCars } from "../actions/GeneralAppActions";

import { Link } from "react-router-dom";

const CarListing = ({ fullMode = true }) => {
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
        dispatch(loadCars());
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
                    <span>{`Page ${pagination.current_page ?? "First"} of ${
                        pagination.last_page ?? "Last"
                    }`}</span>
                )}
            </div>
            <section className="car-list car-drive-container">
                {cars.length != 0 && (
                    <>
                        {cars.map((car, index) => (
                            <CarCard
                                car={car}
                                index={index}
                                bgImg={`url(/storage/images/${
                                    homeImages[Math.floor(Math.random() * 2)]
                                })`}
                            />
                        ))}
                    </>
                )}
            </section>

            {fullMode && (
                <section className="pagination car-drive-container">
                    <button
                        className={!pagination.prev_page_url && "disabled"}
                        onClick={(e) => {
                            e.preventDefault();
                            pagination.prev_page_url &&
                                getPage(pagination.prev_page_url);
                        }}
                    >
                        PREV
                    </button>
                    <section className="page-numbers">
                        {pagination?.links?.map((pageLink , index) => {


                            if (index != 0 && index != pagination.links.length - 1 ) {
                                return (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            getPage(pageLink.url);
                                        }}
                                        key={index}
                                    >
                                       {pageLink.label}
                                    </button>
                                );
                            }

                        })}
                    </section>
                    <button
                        className={!pagination.next_page_url && "disabled"}
                        onClick={(e) => {
                            e.preventDefault();
                            pagination.next_page_url &&
                                getPage(pagination.next_page_url);
                        }}
                    >
                        NEXT
                    </button>
                </section>
            )}
        </section>
    );
};

export default CarListing;
