import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../button/button.component";

import { UpdateCrew, POPUP_DELETE } from "../../redux/actions/crewAction";
import "./deleteModal.scss";
import { DeleteCrew } from "../../redux/actions/crewAction";

import { deleteProperty, updateProperty } from "../../redux/actions/propertyAction";
const ModalComponent = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const { properties } = useSelector((state) => state.propertyReducer);
  const { payloadToDelete } = useSelector((state) => state.crewReducer);

  const [senderEmail, setsenderEmail] = useState("");

  const [property, setProperty] = useState(0);

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
