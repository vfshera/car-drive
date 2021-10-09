import React, { useEffect, useState , useRef} from "react";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import InputField from "../components/form-elements/InputField";
import axios from "axios";

const AddCar = () => {
    const [usableCars, setCars] = useState(null);
    const [usableModels, setUsableModels] = useState([]);

    const [selectedMake, setMake] = useState(null);
    const [selectedModel, setModel] = useState(null);



    const modelRef = useRef("")
    const makeRef = useRef("")



    const saveCar = (e) =>{
        e.preventDefault();
    }



    useEffect(() => {

        if (selectedMake == null || selectedMake == "") {
            setModel([]);
        }else{

          let foundCar = usableCars.find((car) => (  car.make == selectedMake ))


          console.log("REF MAKE",makeRef.current.value);
          console.log("REF MODEL",modelRef.current.value);
          console.log("FOUND", foundCar);

          if(foundCar == undefined){
              modelRef.current.value = "";
          }
            setUsableModels(foundCar?.models || []);
        }

    }, [selectedMake]);

    useEffect(() => {
        axios
            .get("/auth/car-information")
            .then((res) => setCars(res.data.cars))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="add-car-form">
            <h1>Add Car</h1>

            <form action="" onSubmit={saveCar}>


                <div className="input-group">
                    <label>Make</label>

                    <input
                        list="makedt"
                        name="make"
                        id="make"
                        placeholder="Car make"
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
                    <label>Model</label>

                    <input
                        list="modeldt"
                        name="model"
                        id="model"
                        placeholder={`${ (usableModels.length != 0) ? "Type or Click to see Car Model prediction" : "Enter Car make First!"}`}
                        onChange={(e) => setModel(e.target.value)}
                        disabled={usableModels.length == 0}
                        ref={modelRef}
                    />

                    <datalist id="modeldt">
                        {(usableModels.length != 0) &&  usableModels?.map((model, index) => (
                            <option value={model} key={index} />
                        ))}
                    </datalist>
                </div>

               

                <div className="form-btns">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;
