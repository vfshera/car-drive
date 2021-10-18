
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    TIME_SUCCESS,
    TIME_RESET
   } from '../constants/AuthConstants'

   import { LOADING, NOT_LOADING} from '../constants/AppConstants';


import axios from "axios";

axios.defaults.withCredentials = true;


const setHeader = (token) => {
    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};








export const loginUser = (user) => async (dispatch) => {
    // try {

        dispatch({ type: USER_LOGIN_REQUEST });
        dispatch({ type: TIME_RESET });

        dispatch({ type: LOADING});


         axios.post("/login", user)
             .then(res =>{

                 dispatch({type: TIME_SUCCESS,
                             payload: { tst: res.data.tst, overtime: res.data.overtime}
                         })


                 axios.get("/auth/profile")
                     .then(response =>{

                         if(response.status == 200){

                             dispatch({
                                 type: USER_LOGIN_SUCCESS,
                                 payload: response.data,
                             });

                         }

                     }).catch(error =>{
                         return false;
                 });

             })
             .catch(err => {

                 dispatch({
                             type: USER_LOGIN_FAIL,
                             payload: "Login Failed",
                         });
             });

    dispatch({ type: NOT_LOADING});

};



export const socialLogin = (code, provider) => async (dispatch) => {
    try {

        dispatch({ type: USER_LOGIN_REQUEST });
        dispatch({ type: TIME_RESET });
        dispatch({ type: LOADING});


        const res = await axios.get(`/social-login/authorize/${provider}/callback`, {
            params: code,
        });

        const loggedClient = await axios.get("/auth/profile");

        dispatch({type: TIME_SUCCESS,
            payload: { tst: data.tst, overtime :data.overtime}
        })


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: loggedUser.data,
        });



    } catch (error) {



        dispatch({
            type: USER_LOGIN_FAIL,
            error: "Social Login Failed!",
        });
    }

    dispatch({ type: NOT_LOADING});

};





export const registerUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        dispatch({ type: LOADING});


        const data = await axios.post("/register", user);

        dispatch({ type: USER_REGISTER_SUCCESS });

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: "Failed to register user!",
        });
    }

    dispatch({ type: NOT_LOADING});P

};







export const refreshUser = () =>   async (dispatch) => {

    dispatch({ type: TIME_RESET });

    dispatch({ type: LOADING});


    axios.get("/auth/refresh-token")
        .then((res) => {

            if(res.status == 200){

                dispatch({type: TIME_SUCCESS,
                    payload: { tst: res.data.tst, overtime: res.data.overtime}
                })

                axios.get("/auth/profile").then((response) => {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
                });
            }

        })
        .catch((err) => {

            dispatch({
                type: USER_LOGIN_FAIL,
                payload: "Unauthenticated!",
            });

        });

        dispatch({ type: NOT_LOADING});


};





export const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOADING});
    const { status } = await axios.post("/auth/logout");

    if (status == 200) {

        dispatch({ type: USER_LOGOUT });
    }

    dispatch({ type: NOT_LOADING});

};


