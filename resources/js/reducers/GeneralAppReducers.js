import {
    LOADING,
    NOT_LOADING,
    GET_CAR_SUCCESS,
    GET_CAR_REQUEST,
    GET_CAR_FAIL,
} from "../constants/AppConstants";

export const LoadingStateReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case LOADING:
            return { loading: true };

        case NOT_LOADING:
            return { loading: false };

        default:
            return state;
    }
};

export const CarsReducer = (state = { cars: [], pagination: {} }, action) => {
    switch (action.type) {
        case GET_CAR_REQUEST:
            return {
                cars: [],
                pagination: {},
            };

        case GET_CAR_SUCCESS:
            return {
                cars: action.payload.cars,
                pagination: action.payload.pagination,
            };

        case GET_CAR_FAIL:
            return { cars: [], pagination: {}, error: action.payload };

        default:
            return state;
    }
};
