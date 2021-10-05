
import React from "react";

import { useSelector } from "react-redux";

const Loader = () => {
    const AppLoading = useSelector(state => state.appLoading);

    return (
        <div className="loader">
            {AppLoading.loading && (<div className="loading"></div>)}
        </div>
    );
};

export default Loader;
