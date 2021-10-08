import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from "react-google-maps";

const AdminSingleCar = (props) => {
    const [car, setCar] = useState({});
    const [mapView, setMapView] = useState(false);

    const [latitude, setLat] = useState(-1.292066);
    const [longitude, setLong] = useState(36.821945);

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];

    useEffect(() => {
        axios
            .get(`/auth/single-car/${props.match.params.carID}`)
            .then((res) => {
                if (res.status == 200) {
                    setCar(res.data.data);

                   
                }
            })
            .catch((err) => {});
    }, []);

    let WrappedMap = withScriptjs(
        withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: latitude, lng: longitude }}
            >
                <Marker
                    position={{ lat: latitude, lng: longitude }}
                   
                />

                
            </GoogleMap>
        ))
    );


    useEffect(() =>{

        setLat(
            parseFloat(car?.show_location?.split(",")[1])
        );
        setLong(
            parseFloat(car?.show_location?.split(",")[0])
        );
       
    },[car])

    return (
        <>
            {mapView && (
                <div className="car-map-overlay-wrapper">
                    <div className="map-overlay">
                        <div className="close-handler">
                            <button
                                className="close"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMapView(false);
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="map-feed">
                            <WrappedMap
                                loadingElement={
                                    <div style={{ height: "100vh" }} />
                                }
                                containerElement={
                                    <div style={{ height: "100vh" }} />
                                }
                                mapElement={<div style={{ height: "100vh" }} />}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.MIX_REACT_APP_MAP_KEY}`}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="single-car-page car-drive-container">
                <div className="single-car-wrapper">
                    <div className="title">
                        <Link to="/dashboard/cars">Cars</Link>
                        <span>|</span>
                        <h2>{car.make}</h2>
                        <h3>{car.model}</h3>
                    </div>
                    <div className="details">
                        <div
                            className="car-photo"
                            style={{
                                backgroundImage: `url(/storage/images/${
                                    homeImages[Math.floor(Math.random() * 2)]
                                })`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <div className="description">
                            <p>
                                Make <span>{car.make}</span>
                            </p>
                            <p>
                                Model <span>{car.model}</span>
                            </p>
                            <p>
                                Year <span>{car.year}</span>
                            </p>
                            <p>
                                Owner <span>{car?.user?.name}</span>
                            </p>

                            <div className="photos">
                                {car?.car_images?.length != 0 ? (
                                    car?.car_images?.map((carImg, index) => (
                                        <div
                                            className="photo"
                                            key={index}
                                            style={{
                                                backgroundImage: `url(/storage/images/${
                                                    homeImages[
                                                        Math.floor(
                                                            Math.random() * 2
                                                        )
                                                    ]
                                                })`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></div>
                                    ))
                                ) : (
                                    <div className="no-photo"></div>
                                )}
                            </div>

                            <div className="actions">
                                <button
                                    className="map"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMapView(true);
                                    }}
                                >
                                    <i className="ti-location-pin"></i>
                                    Get Location
                                </button>
                                <button className="chat">
                                    <i className="ti-comments"></i>
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSingleCar;
