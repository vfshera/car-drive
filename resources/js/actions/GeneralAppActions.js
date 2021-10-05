import { LOADING_RESOURCE , NOT_LOADING_RESOURCE } from "../constants/AppConstants";



export const setAppLoading = (isLoading) =>   async (dispatch) => {
  
   if(isLoading){

    dispatch({ type: LOADING_RESOURCE });

   }else{

    dispatch({ type: NOT_LOADING_RESOURCE });

}

        
};