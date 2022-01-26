import { crewTypes } from "../types/crew.types";

const crewReducer = (state = { crews: [], showPopup: false, crewInvitations: [], showPopupUpdate: false, showPopupDelete: false }, action) => {
  switch (action.type) {
    case crewTypes.FETCH_CREW_START:
      return {
        ...state,
        loading: true,
      };
    case crewTypes.FETCH_CREW_SUCCESS:
      return {
        ...state,
        loading: false,
        crews: action.crews,
      };
    case crewTypes.FETCH_CREW_FAIL:
      return {
        ...state,
        loading: false,
        //error: action.error,
      };

    case crewTypes.CREATE_CREW_START:
      return {
        ...state,
        loading: true,
      };
    case crewTypes.CREATE_CREW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case crewTypes.CREATE_CREW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
      };
    case crewTypes.CREW_INVITION_SUCCESS:
      return {
        ...state,
        loading: false,
        invitationSuccess: true,
      };
    case crewTypes.CREW_INVITION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,

        invitationSuccess: true,
      };
    case crewTypes.RESET_CREW:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };
    case crewTypes.TOGGLE_POPUP:
      return {
        ...state,
        showPopup: !state.showPopup,
        error: null,
        success: false,
      };
    case crewTypes.TOGGLE_POPUP_UPDATE:
      return {
        ...state,
        showPopupUpdate: !state.showPopupUpdate,
        payloadToUpdate: action.payloadToUpdate,
      };
    case crewTypes.POPUP_DELETE:
      return {
        ...state,
        showPopupDelete: !state.showPopupDelete,
        payloadToDelete: action.payloadToDelete,
      };

    default:
      return state;
  }
};

export default crewReducer;
