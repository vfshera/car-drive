
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
    try {

        dispatch({ type: USER_LOGIN_REQUEST });
        dispatch({ type: TIME_RESET });

        dispatch({ type: LOADING});
        

        const { data } = await axios.post("/login", user);   
        
        
        dispatch({type: TIME_SUCCESS,
            payload: { tst: data.tst, overtime :data.overtime}
        })
        

        const loggedUser = await axios.get("/auth/profile");


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: loggedUser.data,
        });

        dispatch({ type: NOT_LOADING});


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            error: error,
        });
    }
};



export const socialLogin = (code, provider) => async (dispatch) => {
    try {

        dispatch({ type: USER_LOGIN_REQUEST });
        dispatch({ type: TIME_RESET });
        dispatch({ type: LOADING});


        const res = await axios.get(`/social-login/authorize/${provider}/callback`, {
            params: code,
        });

        const loggedClient = await axios.post("/auth/profile");

        dispatch({type: TIME_SUCCESS,
            payload: { tst: data.tst, overtime :data.overtime}
        })
        

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: loggedUser.data,
        });

        dispatch({ type: NOT_LOADING});

        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            error: error,
        });
    }
};





export const registerUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        dispatch({ type: LOADING});


        const data = await axios.post("/api/register", user);

        dispatch({ type: USER_REGISTER_SUCCESS });
        dispatch({ type: NOT_LOADING});

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error,
        });
    }
};







export const refreshUser = () =>   async (dispatch) => {
  
    dispatch({ type: TIME_RESET });

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

        
};


            
    

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOADING});
    const { status } = await axios.post("/auth/logout");

    if (status == 200) {
        dispatch({ type: NOT_LOADING});

        dispatch({ type: USER_LOGOUT });
    }
};


