import axios from "../../axios";
import { crewTypes } from "../types/crew.types";

export const fetchcrews = ({ token, proprtyid }) => {
  return dispatch => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: crewTypes.FETCH_CREW_START });
    axios.get(`/api/crew/?property=${proprtyid}`, config).then((response) => {

      dispatch({ type: crewTypes.FETCH_CREW_SUCCESS, crews: response.data });
    }).catch((error) => dispatch({ type: crewTypes.FETCH_CREW_FAIL, error: error }))
  }

}


export const createCrew = ({ crew, token }) => {
  return dispatch => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(crew)
    dispatch({ type: crewTypes.CREATE_CREW_START });
    axios.post("/api/invite-send/", crew, config).then((response) => {
      dispatch({ type: crewTypes.CREATE_CREW_SUCCESS, success: response.ok });
    }).catch((error) => {

      dispatch({ type: crewTypes.CREATE_CREW_FAILURE, error: error.response.data.detail });
    })
  }
}
export const UpdateCrew = ({ crew, token, id }) => {
  console.log(crew)
  return dispatch => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: crewTypes.UPDATE_CREW_START });
    axios.put(`/api/crew/${id}`, crew, config).then((response) => {
      dispatch({ type: crewTypes.UPDATE_CREW_SUCCESS, success: response.ok });
      dispatch(fetchcrews({ token: token, proprtyid: response.data?.property }))
      dispatch(TOGGLE_POPUP_UPDATE({ payloadToUpdate: null }))
    }).catch((error) => {
      dispatch({ type: crewTypes.UPDATE_CREW_FAILURE, error: error });
    })
  }
}

export const DeleteCrew = ({ Id, token, crew }) => {
  return dispatch => {

    dispatch({ type: crewTypes.DELETE_CREW_START });
    axios.delete(`/api/crew/${Id}`, { data: { crew }, headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      dispatch({ type: crewTypes.DELETE_CREW_SUCCESS, success: response.ok });
      dispatch(fetchcrews({ token: token, proprtyid: crew?.property }))
      dispatch(POPUP_DELETE({ payloadToDelete: null }))
    }).catch((error) => {
      dispatch({ type: crewTypes.DELETE_CREW_FAILURE, error: error });
    })
  }
}
export const inviteCrew = ({ crew, token }) => {
  return dispatch => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: crewTypes.CREATE_CREW_START });
    axios.post("api/invite-send/", crew, config).then((response) => {
      dispatch({ type: crewTypes.CREATE_CREW_SUCCESS, success: response.ok });
    }).catch((error) => {
      dispatch({ type: crewTypes.CREATE_CREW_FAILURE, error: error });
    })
  }
}

export const TOGGLE_POPUP_UPDATE = ({ payloadToUpdate }) => {
  return dispatch => {
    dispatch({ type: crewTypes.TOGGLE_POPUP_UPDATE, payloadToUpdate: payloadToUpdate });
  }
}
export const POPUP_DELETE = ({ payloadToDelete }) => {
  console.log('ds')
  return dispatch => {
    dispatch({ type: crewTypes.POPUP_DELETE, payloadToDelete: payloadToDelete });
  }
}
