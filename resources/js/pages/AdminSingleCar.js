import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import GoogleMapView from "../components/GoogleMapView";
import NewChat from "./NewChat";

const AdminSingleCar = (props) => {
    const authUser = useSelector((state) => state.authUser);

    const { loggedInUser, loading, auth, error } = authUser;

    const photoRef = useRef();

    const hist = useHistory();

    const [car, setCar] = useState({});
    const [mapView, setMapView] = useState(false);
    const [newChatView, setChatView] = useState(false);
    const [photoSelected, setPhotoSelected] = useState({});
    const [photoIndex, setPhotoIndex] = useState(0);

    const [latitude, setLat] = useState(-1.292066);
    const [longitude, setLong] = useState(36.821945);

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];

    const deleteCar = () => {
        Swal.fire({
            title: "Yow Want To This Car?",
            icon: "warning",
            text: "You wont be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/auth/single-car/${car.id}`)
                    .then((res) => {
                        if (res.status == 200) {
                            hist.goBack();
                        }
                    })
                    .catch((err) => {});
            }
        });
    };

    const deleteSelectedImage = () => {
        if (car.photos <= 1) {

            Swal.fire({
                icon: "warning",
                title: "Bad Idea",
                text: "You Can not delete the only Image!",
            });

            return;
        }

        Swal.fire({
            title: "Yow Want To Delete This Image?",
            icon: "warning",
            text: "You wont be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/auth/single-car-image/${car.id}/${photoIndex}`)
                    .then((res) => {
                        if (res.status == 200) {
                            getData();
                        }
                    })
                    .catch((err) => {});
            }
        });
    };

    const askToUpload = () => {
        const photoFile = photoRef?.current?.files[0];

        Swal.fire({
            title: "Yow Want To Upload Photo?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                let formData = new FormData();

                formData.append("photo", photoFile);

                axios
                    .post(
                        `/auth/single-car-media/${props.match.params.carID}`,
                        formData
                    )
                    .then((res) => {
                        if (res.status == 201) {
                            getData();
                        }
                    })
                    .catch((err) => {});
            }
        });
    };

    const getData = () => {
        axios
            .get(`/auth/single-car/${props.match.params.carID}`)
            .then((res) => {
                if (res.status == 200) {
                    setCar(res.data.data);
                }
            })
            .catch((err) => {});
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!newChatView) {
            getData();
        }
    }, [newChatView]);

    useEffect(() => {
        setLat(parseFloat(car?.show_location?.split(",")[0]));
        setLong(parseFloat(car?.show_location?.split(",")[1]));

        car?.photos && setPhotoSelected(car?.photos[0]);
    }, [car]);

    return (
        <>
            {newChatView && (
                <NewChat
                    setChatView={setChatView}
                    withUser={true}
                    toUser={car?.user}
                />
            )}

            {/* MAP OVERLAY */}
            {mapView && (
                <GoogleMapView
                    setMapView={setMapView}
                    longitude={longitude}
                    latitude={latitude}
                />
            )}

            {/* DISPLAY CAR */}
            {!newChatView && (
                <div className="single-car-page car-drive-container">
                    <div className="single-car-wrapper">
                        <div className="title">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    hist.goBack();
                                }}
                            >
                                Cars
                            </button>
                            <span>|</span>
                            <h2>{car.make}</h2>
                            <h3>{car.model}</h3>
                        </div>
                        <div className="details">
                            <div
                                className="car-photo"
                                style={{
                                    backgroundImage: `url(${
                                        photoSelected?.url ||
                                        "/storage/images/" +
                                            homeImages[
                                                Math.floor(Math.random() * 2)
                                            ]
                                    })`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                {(loggedInUser?.id == car?.user?.id) && (car?.photos?.length > 1) && (
                                    <div
                                        className="delete-image"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteSelectedImage();
                                        }}
                                    >
                                        <i className="ti-trash"></i>
                                        <span>Delete</span>
                                    </div>
                                )}
                            </div>
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
                                    {car?.photos?.length != 0 &&
                                        car?.photos?.map((photo, index) => (
                                            <div
                                                className="photo"
                                                key={index}
                                                onClick={(e) => {
                                                    setPhotoSelected(photo);
                                                    setPhotoIndex(index);
                                                }}
                                                style={{
                                                    backgroundImage: `url(${photo?.thumbnail})`,
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundSize: "cover",
                                                    backgroundPosition:
                                                        "center",
                                                }}
                                            ></div>
                                        ))}

                                    {(car?.photos?.length < 5) && (loggedInUser?.id == car?.user?.id) && (
                                        <div
                                            className="no-photo"
                                            onClick={(e) =>
                                                photoRef.current.click()
                                            }
                                        >
                                            <i className="ti-plus"></i>
                                            <input
                                                type="file"
                                                name="photo"
                                                ref={photoRef}
                                                onChange={askToUpload}
                                                hidden={true}
                                            />
                                        </div>
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

                                    {loggedInUser?.id != car?.user?.id && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();

                                                car?.threadID &&
                                                    hist.push(
                                                        `/dashboard/chat/${car?.threadID}/messages`
                                                    );

                                                !car?.threadID &&
                                                    setChatView(true);
                                            }}
                                            className={`chat `}
                                        >
                                            <i className="ti-comments"></i>
                                            Chat
                                        </button>
                                    )}

                                    {loggedInUser?.id == car?.user?.id && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteCar();
                                            }}
                                            className="remove-post"
                                        >
                                            <i className="ti-trash"></i>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSingleCar;
