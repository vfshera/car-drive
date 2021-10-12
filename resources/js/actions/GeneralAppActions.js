import {
    LOADING,
    NOT_LOADING,
    GET_CAR_FAIL,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    GET_CHATS_FAIL,
    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
} from "../constants/AppConstants";

export const setAppLoading = (isLoading) => async (dispatch) => {
    if (isLoading) {
        dispatch({ type: LOADING });
    } else {
        dispatch({ type: NOT_LOADING });
    }
};

export const loadCars = (carUrl = "/cars") => async (dispatch) => {
    try {
        dispatch({ type: LOADING });
        dispatch({ type: GET_CAR_REQUEST });


        const res = await axios.get(carUrl);
        

        dispatch({
            type: GET_CAR_SUCCESS,
            payload: { cars: res.data.data, pagination: { links:res.data.links , meta: res.data.meta } },
        });
    } catch (error) {


        dispatch({
            type: GET_CAR_FAIL,
            error: error,
        });
    }

    dispatch({ type: NOT_LOADING });
};



export const loadChats = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING });
        dispatch({ type: GET_CHATS_REQUEST });


        const res = await axios.get("/auth/messages");
        

        dispatch({
            type: GET_CHATS_SUCCESS,
            payload: {chats: res.data.data},
        });
    } catch (error) {


        dispatch({
            type: GET_CHATS_FAIL,
            error: error,
        });
    }

    dispatch({ type: NOT_LOADING });
};
