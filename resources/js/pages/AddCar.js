import React, { useEffect, useState, useRef } from "react";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import InputField from "../components/form-elements/InputField";
import axios from "axios";
import SelectInputField from "../components/form-elements/SelectInputField";

import GoogleMapView from "../components/GoogleMapView";
import FileUpload from "../components/FileUpload";

const AddCar = ({ setIsOpen }) => {
    const [usableCars, setCars] = useState(null);
    const [yearRange, setYears] = useState([]);
    const [usableModels, setUsableModels] = useState([]);

    const [selectedMake, setMake] = useState(null);
    const [selectedModel, setModel] = useState(null);
    const [selectedYear, setYear] = useState(null);

    const [mapView, setMapView] = useState(false);

    const modelRef = useRef("");
    const makeRef = useRef("");

    const saveCar = (e) => {
        e.preventDefault();

        axios
            .post("/auth/add-car", {
                make: selectedMake,
                model: selectedModel,
                year: selectedYear,
                show_location: "01,100",
            })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (selectedMake == null || selectedMake == "") {
            setModel([]);
        } else {
            let foundCar = usableCars.find((car) => car.make == selectedMake);

            if (foundCar == undefined) {
                modelRef.current.value = "";
            }
            setUsableModels(foundCar?.models || []);
        }
    }, [selectedMake]);

    useEffect(() => {
        axios
            .get("/auth/car-information")
            .then((res) => {
                setCars(res.data.cars);
                setYears(res.data.years);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {mapView && (
                <GoogleMapView setMapView={setMapView} searchMode={true} />
            )}

            <div className="add-car-form">
                <h1>Add Car</h1>

                <form action="" onSubmit={saveCar}>
                    <div className="form-input-section">
                        <div className="form-col">
                            <div className="input-group">
                                <label>Make</label>

                                <input
                                    className="with-datalist"
                                    list="makedt"
                                    name="make"
                                    id="make"
                                    placeholder="Start Typing to Select Your Car make"
                                    onChange={(e) => setMake(e.target.value)}
                                    ref={makeRef}
                                />

                                <datalist id="makedt">
                                    {usableCars?.map((car, index) => (
                                        <option value={car.make} key={index} />
                                    ))}
                                </datalist>
                            </div>

                            <div className="input-group">
                                <label>
                                    Model{" "}
                                    {usableModels.length == 0 && (
                                        <small className="text-xs text-red-500 font-normal">
                                            * Select Make First! *
                                        </small>
                                    )}
                                </label>

                                <input
                                    className="with-datalist"
                                    list="modeldt"
                                    name="model"
                                    id="model"
                                    placeholder={`${
                                        usableModels.length != 0
                                            ? "Type or Click to see Car Model prediction"
                                            : "Select Your Car make First!"
                                    }`}
                                    onChange={(e) => setModel(e.target.value)}
                                    disabled={usableModels.length == 0}
                                    ref={modelRef}
                                />

                                <datalist id="modeldt">
                                    {usableModels.length != 0 &&
                                        usableModels?.map((model, index) => (
                                            <option value={model} key={index} />
                                        ))}
                                </datalist>
                            </div>

                            <SelectInputField
                                labelText="Year"
                                selectName="year"
                                selectID="year"
                                selectOptions={yearRange}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>

                        <div className="form-col">
                            <div className="showroom">
                                <h3>Show Room Location</h3>
                                <div className="location">
                                    <p>None</p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMapView(true);
                                        }}
                                    >
                                        Pick Location
                                    </button>
                                </div>
                            </div>

                            <div className="file-upload">
                                <h3>Image</h3>
                                <FileUpload />
                            </div>
                        </div>
                    </div>
                    <div className="form-btns">
                        <button type="submit">Add</button>
                        <button
                            className="cancelBtn"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(false);
                            }}
                        >
                            Close Form
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCar;
