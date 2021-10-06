import {
    LOADING,
    NOT_LOADING,
    GET_CAR_FAIL,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
} from "../constants/AppConstants";

export const setAppLoading = (isLoading) => async (dispatch) => {
    if (isLoading) {
        dispatch({ type: LOADING });
    } else {
        dispatch({ type: NOT_LOADING });
    }
};

export const loadCars = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING });
        dispatch({ type: GET_CAR_REQUEST });
        

        const res = await axios.get("/cars");
        const { data, ...pagination } = res.data;

        dispatch({
            type: GET_CAR_SUCCESS,
            payload: { cars: data, pagination: pagination },
        });
    } catch (error) {

        
        dispatch({
            type: GET_CAR_FAIL,
            error: error,
        });
    }

    dispatch({ type: NOT_LOADING });
};
