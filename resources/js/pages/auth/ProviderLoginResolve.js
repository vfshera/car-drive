import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";


import { socialLogin } from "../../actions/AuthActions";


const ProviderLoginResolve = ({ location }) => {
    const dispatch = useDispatch();
    const hist = useHistory();

    const { provider } = useParams();

    const authUser = useSelector((state) => state.authUser);
    const { auth } = authUser;


    const loginCallback = () => {
        const searchParams = new URLSearchParams(location.search);

        dispatch(socialLogin({ code: searchParams.get("code") }, provider));
    };


    useEffect(() => {
        if (auth) {
            location.state && location.state.next
                ? hist.push(location.state.next)
                : hist.push("/dashboard");
        }
    }, [auth]);



    useEffect(() => {
        window.scrollTo(0, 0);

        document.querySelector("title").text = "Car Drive | Login Redirect...";

        loginCallback();

    }, []);



    return (
        <div className="login-resolve-page">
            <h1>Checking Your Credentials with {provider.charAt(0).toUpperCase() + provider.slice(1)}...</h1>
        </div>
    );
};

export default ProviderLoginResolve;
