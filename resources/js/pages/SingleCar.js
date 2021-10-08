import React,{useEffect, useState} from 'react'
import {Link} from "react-router-dom"

const SingleCar = (props) => {

    const[car,setCar] = useState({})
    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];


useEffect(() =>{

 axios.get(`/single-car/${props.match.params.carID}`)
 .then(res => {


if(res.status == 200){
    setCar(res.data.data)
}

 })
 .catch(err => {

 })
},[])

    return (
        <div className="single-car-page car-drive-container">

            <div className="single-car-wrapper">
            <div className="title">
            <Link to="/listing">Cars</Link>
            <span>|</span>
            <h2>{car.make}</h2>
            <h3>{car.model}</h3>
            </div>
            <div className="details">
            <div
            className="car-photo"
            style={{
                backgroundImage: `url(/storage/images/${homeImages[Math.floor(Math.random() * 2)]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            />
            <div className="description">
                <p>Make <span>{car.make}</span></p>
                <p>Model <span>{car.model}</span></p>
                <p>Year <span>{car.year}</span></p>
                <p>Owner <span>{car?.user?.name}</span></p>

                <div className="photos">

                    {car?.car_images?.length != 0 && car?.car_images?.map((carImg,index) => (

                            <div
                                className="photo"
                                key={index}
                                style={{
                                backgroundImage: `url(/storage/images/${homeImages[Math.floor(Math.random() * 2)]})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>

                            </div>

                    ))}

                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default SingleCar
