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

    const [isOpen, setIsOpen] = useState(false);

    const trimTitle = (make, model) => {
        let title = make + model;

        return model + "/" + title.length;
    };

    const dummy = [1, 2, 3, 4, 5, 6];

    const getPage = (pageUrl) => {
        dispatch(loadCars(pageUrl));
    };

    const getCarPhoto = (singleCar) => {
        if (singleCar?.photos?.length != 0) {
            return singleCar?.photos[0]?.url;
        }

        return "/storage/images/" + homeImages[Math.floor(Math.random() * 2)];
    };

    useEffect(() => {
        document.querySelector("title").text = "CarDrive";
        dispatch(
            loadCars(MyCars ? "/auth/mycars" : inAdmin ? "/auth/cars" : "/cars")
        );
    }, []);

    return (
        <section className="car-list-wrapper">
            {/* ADD CARS SECTION */}

            {MyCars && isOpen && (
                <section className="add-car-form-wrapper">
                    <AddCar setIsOpen={setIsOpen} />
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

            {cars.length != 0 && !AppLoading.loading && !isOpen && (
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
                                bgImg={`url(${getCarPhoto(car)})`}
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
            {cars.length == 0 && !AppLoading.loading && !inAdmin && (
                <div className="h-1/2vh flex flex-col justify-center items-center w-full">
                    <h1 className="text-brand-1 font-bold text-2xl">
                        No Cars Posted Yet!
                    </h1>
                    <p className="text-gray-800  text-lg italic">
                        You can{" "}
                        <Link to="/login" className="text-brand-2">
                            Create Your Account Here
                        </Link>{" "}
                        and start posting instantly!
                    </p>
                </div>
            )}
            {/* ADMIN NO CARS */}
            {cars.length == 0 && !AppLoading.loading && inAdmin && (
                <div className="h-3/4vh flex flex-col justify-center items-center w-full">
                    <p className="mb-3 text-brand-1 text-xl text-center">
                        Seems We couldn't Find Cars!
                    </p>
                    {inAdmin && (
                        <button
                            className="add-cars"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(true);
                            }}
                        >
                            Add <i className="ti-plus"></i>
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default CarListing;
