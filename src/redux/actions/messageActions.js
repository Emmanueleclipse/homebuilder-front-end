
import axios from "../../axios";
import { messageTypes } from "../types/message.types";
import {  toast } from "react-toastify";

export const fetchMessages = ({ token , id}) => {
  return dispatch => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    dispatch({ type: messageTypes.FETCH_MESSAGE_START });
    axios.get("/api/messages/", config).then(response => {
      console.log(response.data)
      let msgs=[]
      console.log('actions msg', id)
      if(!isNaN(id)){
        msgs=response.data.filter(item=>item.property===id) 
      }else{
        msgs=response.data
      }
      dispatch({ type: messageTypes.FETCH_MESSAGE_SUCCESS, messages:msgs });
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
        toast.error( `${error.response.data}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({ type: messageTypes.CREATE_MESSAGE_FAILURE, error: error });
      })
    }
  }

