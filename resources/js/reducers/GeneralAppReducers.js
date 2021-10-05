import { LOADING , NOT_LOADING } from "../constants/AppConstants";





export const LoadingStateReducer = (state = { loading:false }, action) => {
    switch (action.type) {
        case LOADING:
            return { loading: true };

        case NOT_LOADING:
            return { loading:false };

        default:
            return state;
    }
};