import React,{useState} from "react";

import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
} from "react-google-maps";
import GoogleMapAutocomplete from "./GoogleMapAutocomplete";



const GoogleMapView = ({
    longitude,
    latitude,
    setMapView,
    searchMode = false,
}) => {
    const defaultLatitude = -1.292066;
    const defaultLongitude = 36.821945;

   

    let WrappedMap = withScriptjs(
        withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{
                    lat: latitude || defaultLatitude,
                    lng: longitude || defaultLongitude,
                }}
            >
                <Marker
                    position={{
                        lat: latitude || defaultLatitude,
                        lng: longitude || defaultLongitude,
                    }}
                />
            </GoogleMap>
        ))
    );

    return (
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

                {searchMode && (<GoogleMapAutocomplete />)}

                <div className="map-feed">
                    <WrappedMap
                        loadingElement={<div style={{ height: "100vh" }} />}
                        containerElement={<div style={{ height: "100vh" }} />}
                        mapElement={<div style={{ height: "100vh" }} />}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.MIX_REACT_APP_MAP_KEY}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default GoogleMapView;
