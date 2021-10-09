import React, { useEffect, useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import CarCard from "../components/CarCard";

import { loadCars } from "../actions/GeneralAppActions";
import Pagination from "../components/Pagination";
import CarCardSkeleton from "../components/CarCardSkeleton";
import AddCar from "./AddCar";

const CarListing = ({ fullMode = true, inAdmin = false, MyCars = false }) => {
    const dispatch = useDispatch();

    const AppCars = useSelector((state) => state.appCars);
    const AppLoading = useSelector((state) => state.appLoading);

    const { cars, pagination } = AppCars;

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];

    const [isOpen, setIsOpen] = useState(true);

    const trimTitle = (make, model) => {
        let title = make + model;

        return model + "/" + title.length;
    };

    const dummy = [1, 2, 3, 4, 5, 6];

    const getPage = (pageUrl) => {
        dispatch(loadCars(pageUrl));
    };

    useEffect(() => {
        dispatch(
            loadCars(MyCars ? "/auth/mycars" : inAdmin ? "/auth/cars" : "/cars")
        );
    }, []);

    return (
        <section className="car-list-wrapper">
            {/* ADD CARS SECTION */}

            {MyCars && isOpen && (
                <section className="add-car-form-wrapper">

                        <AddCar/>

                </section>
            )}

            {/* ADD CARS SECTION END */}

            {/* LOADING CARS SKELETON */}
            {AppLoading.loading && (
                <section className="car-list car-drive-container">
                    {dummy.map((car, index) => (
                        <CarCardSkeleton key={index} />
                    ))}
                </section>
            )}

            {/* DISPLAY CARS */}

            {(cars.length != 0 && !AppLoading.loading && !isOpen) && (
                <>
                    <div className="list-header car-drive-container">
                        <h1>{MyCars ? "My Cars" : "Top Listings"}</h1>

                        {MyCars && (
                            <>
                                <button
                                    className="add-cars"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(true);
                                    }}
                                >
                                    Add <i className="ti-plus"></i>
                                </button>
                            </>
                        )}

                        {!fullMode ? (
                            <Link to="/listing">
                                More <i className="ti-arrow-right"></i>
                            </Link>
                        ) : (
                            <span>{`Page ${
                                pagination?.meta?.current_page ?? "First"
                            } of ${
                                pagination?.meta?.last_page ?? "Last"
                            }`}</span>
                        )}
                    </div>

                    <section className="car-list car-drive-container">
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
                    </section>

                    {fullMode && (
                        <Pagination
                            getPage={getPage}
                            currentPage={pagination?.meta?.current_page}
                            inLastPage={!pagination?.links?.next}
                            inFirstPage={!pagination?.links?.prev}
                            links={pagination?.meta?.links}
                            nextPage={pagination?.links?.next}
                            prevPage={pagination?.links?.prev}
                        />
                    )}
                </>
            )}

            {/* NO CARS */}
            {cars.length == 0 && !AppLoading.loading && (
                <div className="h-1/2vh flex justify-center items-center w-full">
                    <h1 className="text-brand-1 font-semibold text-xl">
                        No Cars
                    </h1>
                </div>
            )}
        </section>
    );
};

export default CarListing;
