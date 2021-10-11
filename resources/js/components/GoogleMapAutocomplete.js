import React, { useState } from "react";

import scriptLoader from "react-async-script-loader";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

const GoogleMapAutocomplete = ({ isScriptLoaded, isScriptLoadSucceed }) => {
    const [address, setAddress] = useState("");

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log("Success", latLng))
            .catch((error) => console.error("Error", error));
    };

    return (
        <div className="map-search">
            <h1>MAP SEARCH</h1>

            {(isScriptLoaded, isScriptLoadSucceed) ? (
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                    }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: "Search Places ...",
                                    className: "location-search-input",
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div className="loading-locations">Loading...</div>}
                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? {
                                              backgroundColor: "#fafafa",
                                              cursor: "pointer",
                                          }
                                        : {
                                              backgroundColor: "#ffffff",
                                              cursor: "pointer",
                                          };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(
                                                suggestion,
                                                {
                                                    className,
                                                    style,
                                                }
                                            )}
                                        >
                                            <span>
                                                {suggestion.description}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            ) : (
                <h1>Waiting For Google</h1>
            )}
        </div>
    );
};

export default scriptLoader([
    `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=${process.env.MIX_REACT_APP_MAP_KEY}`,
])(GoogleMapAutocomplete);
