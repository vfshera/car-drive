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

export const loadCars = (carUrl = "/cars") => async (dispatch) => {
    try {
        dispatch({ type: LOADING });
        dispatch({ type: GET_CAR_REQUEST });


        const res = await axios.get(carUrl);

        // console.log(res.da);
        // const { data, ...pagination } = res.data;

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
