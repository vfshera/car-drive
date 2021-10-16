import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { LOADING, NOT_LOADING } from "../constants/AppConstants";

const GoogleMapAutocomplete = ({ setLoc, setSearchView }) => {
    const [town, setTown] = useState("");
    const [searchResult, setResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searched, setSearched] = useState(false);

    const dispatch = useDispatch();

    const getCoordinates = (place) => {
        if (place == "") {
            return;
        }

        dispatch({ type: LOADING });
        setSearched(true);
        setIsSearching(true);

        delete axios.defaults.headers.common["X-Requested-With"];
        
        axios
            .get(
                `https://api.tomtom.com/search/2/search/${place}.json?typeahead=true&key=${process.env.MIX_REACT_APP_SEARCH_API_KEY}`,
                {
                    withCredentials: false,
                }
            )
            .then((res) => {
                setResult(res.data.results);
            })
            .catch((err) => console.log(err));

        setIsSearching(false);

        dispatch({ type: NOT_LOADING });
    };

    return (
        <div className="map-search">
            <h1>POINT OF INTEREST SEARCH</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search Location here..."
                    onChange={(e) => setTown(e.target.value)}
                    onKeyPress={(e) => {
                        e.charCode == 13 && getCoordinates(town);
                    }}
                />
            </div>

            <div className="search-results">
                {!isSearching &&
                    searchResult.length > 0 &&
                    searchResult.map((result, index) => (
                        <div
                            className="search-result"
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                setLoc({
                                    name:
                                        result?.poi?.name ||
                                        result?.address?.freeformAddress,
                                    location: result?.position,
                                });

                                setSearchView(false);
                            }}
                        >
                            {result?.address?.countryCode}{" "}
                            <span className="text-gray-500 px-1 text-base">
                                |
                            </span>{" "}
                            {result?.poi?.name ||
                                result?.address?.freeformAddress}
                        </div>
                    ))}
            </div>

            {!isSearching && searchResult.length > 0 && (
                <div className="result-count">
                    Found {searchResult.length} Matches
                </div>
            )}

            {isSearching && searched && (
                <div className="searching">Searching...</div>
            )}

            {searched && !isSearching && searchResult.length == 0 && (
                <div className="no-results">No Results</div>
            )}

            {!searched && !isSearching && searchResult.length == 0 && (
                <div className="init-type-prompt">type a location...</div>
            )}

            <button
                className="closeSearch"
                onClick={(e) => {
                    e.preventDefault();
                    setSearchView(false);
                }}
            >
                Close Search
            </button>
        </div>
    );
};

export default GoogleMapAutocomplete;
