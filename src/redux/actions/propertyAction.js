import axios from "../../axios";

import { propertyTypes } from "../types/property.type";
import { crewTypes } from "../types/crew.types";

export const fetchProperties =
  ({ token }) => {
    return dispatch => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: propertyTypes.FETCH_PROPERTY_START });
      axios.get("api/property/", config).then(response => {
        dispatch({
          type: propertyTypes.FETCH_PROPERTY_SUCCESS,
          properties: response.data,
          error: null
        });

      }).catch(error => {
        dispatch({ type: propertyTypes.FETCH_PROPERTY_FAIL, error: error.response });
      })
    }
  }





export const createProperty =
  ({ property, token }) => {
    console.log(property)
    return dispatch => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: propertyTypes.CREATE_PROPERTY_START });
      axios.post("/api/property/", property, config).then(response => {
        console.log(response)
        dispatch({
          type: propertyTypes.CREATE_PROPERTY_SUCCESS,
          id: response.data.pk,
          success: response.ok
        });
      }).catch(error => {
        console.log(error)
        dispatch({ type: propertyTypes.CREATE_PROPERTY_FAILURE, error: "Your account has not been verified" });
      })
    }
  }


export const updateProperty =
  ({ property, token, Id }) => {

    return dispatch => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: propertyTypes.UPDATE_PROPERTY_START });
      axios.put(`/api/property/${Id}`, property, config).then(response => {
        console.log(response)
        dispatch({
          type: propertyTypes.UPDATE_PROPERTY_SUCCESS,
          id: response.data.pk,
          success: response.ok
        });
        dispatch(fetchProperties({ token: token }))
        dispatch(TOGGLE_POPUP({ payloadToUpdate: null }));
        dispatch(POPUP_DELETE())
      }).catch(error => {
        console.log(error.response.data)
        dispatch({ type: propertyTypes.UPDATE_PROPERTY_FAILURE, error: error.response.data });
        dispatch(TOGGLE_POPUP({ payloadToUpdate: null }));
      })
    }
  }

export const deleteProperty =
  ({ property, token, Id }) => {
    
    return dispatch => {

      dispatch({ type: propertyTypes.DELETE_PROPERTY_START });

      axios.delete(`/api/property/${Id}`, { data: { property }, headers: { Authorization: `Bearer ${token}` } }).then(response => {
        dispatch({
          type: propertyTypes.DELETE_PROPERTY_SUCCESS,
          id: response.data.pk,
          success: response.ok
        });
        dispatch(fetchProperties({ token: token }))
        dispatch(POPUP_DELETE())
      }).catch(error => {
        console.log(error.response.data)
        dispatch({ type: propertyTypes.DELETE_PROPERTY_FAILURE, error: error.response.data });
      })
    }
  }
export const resetProperty = () => {
  return dispatch => {
    dispatch({ type: propertyTypes.RESET_PROPERTY })
  }
}
export const TOGGLE_POPUP = ({ payloadToUpdate }) => {
  return dispatch => {
    dispatch({ type: propertyTypes.TOGGLE_POPUP, payloadToUpdate: payloadToUpdate });
  }
}

export const POPUP_DELETE = () => {
  return dispatch => {
    dispatch({ type: crewTypes.POPUP_DELETE, payloadToDelete: null });
  }
}
