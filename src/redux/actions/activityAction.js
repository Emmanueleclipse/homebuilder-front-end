import axios from "../../axios";
import { activityTypes } from "../types/activity.types";
export const fetchActivities =
  ({token,property_id=1}) => (dispatch) => {
   
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: activityTypes.FETCH_ACTIVITY_START });
      axios.get(
        `/api/activity?property=${property_id}`,config
      ).then((response)=>{
        // console.log(response)
        dispatch({
          type: activityTypes.FETCH_ACTIVITY_SUCCESS,
          activities: response.data,
        });

      });
     
    } catch (error) {

      //console.log(error.stat)
      dispatch({
        type: activityTypes.FETCH_ACTIVITY_FAIL,
        error: error.message,
      });
    }
  };



export const createActivity =({ activity, token }) =>{

  return dispatch =>{
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(activity)

    dispatch({ type: activityTypes.CREATE_ACTIVITY_START });
  
    axios.post("/api/activity/",activity,config).then((response)=>{
      console.log(response)
      dispatch({
        type: activityTypes.CREATE_ACTIVITY_SUCCESS,
        success: response.ok,
      });
    }).catch((error)=>{
      console.log(error.response)
      dispatch({
        type: activityTypes.CREATE_ACTIVITY_FAILURE,
        error:
          error.response && error.response.data
            ? error.response.data.message
            : error.message,
      });
    })
  }
}
 
