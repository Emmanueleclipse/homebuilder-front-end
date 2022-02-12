import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import { MILESTONE_SUBMIT} from "../../redux/actions/crewAction";
import axios from "../../axios";

import { UpdateCrew, POPUP_DELETE } from "../../redux/actions/crewAction";
import "./deleteModal.scss";
import { DeleteCrew } from "../../redux/actions/crewAction";
import { ToastContainer, toast } from "react-toastify";

import { deleteProperty, updateProperty , fetchProperties} from "../../redux/actions/propertyAction";
const ModalComponent = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const { properties } = useSelector((state) => state.propertyReducer);
  const { payloadToDelete } = useSelector((state) => state.crewReducer);

  const [senderEmail, setsenderEmail] = useState("");

  const [property, setProperty] = useState(0);
  const { submitMilestone } = useSelector((state) => state.crewReducer);


  // useEffect(() => {
  //   dispatch(fetchProperties({ token: token }));
  // }, [dispatch, token]);


  const handleDelete = () => {
    if (payloadToDelete.action === "DeletCrew") {
      dispatch(DeleteCrew({ token: token, Id: payloadToDelete?.Id, crew: payloadToDelete?.data }))
    }
    else if (payloadToDelete.action === "DeleteProperty") {
      dispatch(deleteProperty({ token: token, property: payloadToDelete?.data, Id: payloadToDelete?.Id }));
    }
    else if (payloadToDelete.action === "EditProperty") {
      dispatch(updateProperty({ property: payloadToDelete?.data, token: token, Id: payloadToDelete?.Id }));
    }
    else if (payloadToDelete.action === "SubmitMilestone") {
      dispatch(POPUP_DELETE({ payloadToDelete: null }))
      axios
      .get("/api/activity/submit/" + payloadToDelete.data.activity_id, {
        headers: { Authorization: `Bearer ${payloadToDelete.props.token}` },
      })
      .then((res) => {
        dispatch(MILESTONE_SUBMIT({}))

        toast.success(payloadToDelete.data.activity_name + " " + "was accepted", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    

        
       /* setFeeds(
          feeds.map((i) => {
            if (i.activity_id === item.activity_id) {
              i = item;
              console.log(i);
            }
            return i;
          })
        );*/
        // item.activity_status='Awaiting feedback';
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.detail, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      
    
    }
    else if (payloadToDelete.action === "ChangesMilestone") {
      dispatch(POPUP_DELETE({ payloadToDelete: null }))

      axios
      .get("/api/activity/decline/" +payloadToDelete.data.activity_id, {
        headers: { Authorization: `Bearer ${payloadToDelete.props.token}` },
      })
      .then((res) => {
        dispatch(MILESTONE_SUBMIT({}))

        toast.warning(payloadToDelete.data.activity_name + " " + "request changes", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(res);

        
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.detail, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }else if (payloadToDelete.action === "AcceptMilestone") {
      dispatch(POPUP_DELETE({ payloadToDelete: null }))

      axios
      .get("/api/activity/approve/" + payloadToDelete.data.activity_id, {
        headers: { Authorization: `Bearer ${payloadToDelete.props.token}` },
      })
      .then((res) => {
        dispatch(MILESTONE_SUBMIT({}))

        toast.success(payloadToDelete.data.activity_name + " " + "Was accept", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       
        // item.activity_status='Awaiting feedback';
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.detail, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }






  };
  return (
    <div className="popup-overlay auth-page popup-crew">
      <div className="auth-page-container invite-container">
        <div
          className="close-icon-container"
          onClick={() => {
            dispatch(POPUP_DELETE({ payloadToDelete: null }))
          }}
        >
          <span class="material-icons">close</span>
        </div>
        <div>
          <h2>Are you sure you want to do this action ?</h2>





          <div className="form-buttons">

            <Button onClick={() => handleDelete()} type="main">Yes</Button>
            <Button onClick={() => {
              dispatch(POPUP_DELETE({ payloadToDelete: null }))
            }} type="no">No</Button>

          </div>



        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
