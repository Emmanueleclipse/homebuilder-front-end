
import axios from "../../axios";
import { messageTypes } from "../types/message.types";

export const fetchMessages = ({ token , id}) => {
  return dispatch => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: messageTypes.FETCH_MESSAGE_START });
    axios.get("/api/messages/", config).then(response => {
      console.log(response.data)
      dispatch({ type: messageTypes.FETCH_MESSAGE_SUCCESS, messages: response.data.filter(item=>item.property===id) });
    }).catch(error => {
      console.log(error)

      dispatch({ type: messageTypes.FETCH_MESSAGE_FAIL, error: error });
    });
  }
}


export const createMessage =
  ({ message, token }) => {
    console.log(message)
    return dispatch => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      dispatch({ type: messageTypes.CREATE_MESSAGE_START });
      axios.post("/api/messages/", message, config).then(response => {
        console.log(response)
        dispatch({ type: messageTypes.CREATE_MESSAGE_SUCCESS, success: response.ok });
      }).catch(error => {
        console.log(error.response)
        dispatch({ type: messageTypes.CREATE_MESSAGE_FAILURE, error: error });
      })
    }
  }

