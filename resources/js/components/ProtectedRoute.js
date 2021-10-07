import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import { refreshUser } from "../actions/AuthActions";

import AdminLayout from './AdminLayout'

const ProtectedRoute = ({  component: Component, ...rest }) => {
    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    let location = useLocation();

    const isAllowed = () => {

        if ((JSON.stringify(loggedInUser) != "{}") && auth) {

                return true;

           }

        return false;
    };


    



    return (
        <Route
            {...rest}

            render={(props) => {

                if (isAllowed()) {
                    return <AdminLayout><Component {...props} /></AdminLayout>;
                }


                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { next: location.pathname },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;