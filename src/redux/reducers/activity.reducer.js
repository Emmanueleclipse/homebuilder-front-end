import { activityTypes } from "../types/activity.types";

const activityReducer = (state = { activities: [] }, action) => {
  switch (action.type) {
    case activityTypes.FETCH_ACTIVITY_START:
      return {
        ...state,
        loading: true,
      };
    case activityTypes.FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.activities,
      };
    case activityTypes.FETCH_ACTIVITY_FAIL:
      return {
        ...state,
        loading: false,
        activities: [],
        error: action.error,
      };

    case activityTypes.CREATE_ACTIVITY_START:
      return {
        ...state,
        creatingActivity:true,
        loading: true,
      };
    case activityTypes.CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activityCreated:false,
        success: true,
      };
    case activityTypes.CREATE_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        activityCreated:false,
        error: action.error,
        success: false,
      };
    case activityTypes.RESET_ACTIVITY:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default activityReducer;
