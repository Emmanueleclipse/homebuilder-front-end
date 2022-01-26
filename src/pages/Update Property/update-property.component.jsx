import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";

import { crewTypes } from "../../redux/types/crew.types";
import "./update-property.styles.scss";
import FormInput from "../../components/form-input/form-input.component";
import { updateProperty, TOGGLE_POPUP_UPDATE } from "../../redux/actions/propertyAction";
import DeleteModal from '../../components/DeleteDialouge/deleteModal'
import { POPUP_DELETE } from "../../redux/actions/crewAction";
const UpdateProperty = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const {
    error: propertyError,
    creatingProperty: creatingProperty,

    payloadToUpdate,
  } = useSelector((state) => state.propertyReducer);
  const { showPopupDelete } = useSelector((state) => state.crewReducer);

  const [name, setName] = useState("");
  const [statetxt, setStatetxt] = useState("");
  // const [homeowner, setHomeOwner] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  useEffect(() => {
    const { name, state, address, city, zip_code } = payloadToUpdate
    setName(name)
    setAddress(address)
    setCity(city)
    setZipCode(zip_code)
    setStatetxt(state)

  }, [payloadToUpdate?.pk]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const propertyObj = {
      name: name,
      state: statetxt,
      city: city,
      address: address,
      zip_code: zipCode
    };


    dispatch(POPUP_DELETE({
      payloadToDelete: {
        Id: payloadToUpdate?.pk,
        action: "EditProperty",
        data: propertyObj
      }
    }))


    // 
  };
  return (
    <div className="popup-overlay auth-page popup-crew">
      <div className="auth-page-container invite-container">
        <div
          className="close-icon-container"
          onClick={() => {
            dispatch({ type: crewTypes.TOGGLE_POPUP });
          }}
        >
          <span class="material-icons">close</span>
        </div>
        <div>
          <h2>Edit propert Details</h2>
          <form onSubmit={handleSubmit}>
            {/* {propertyError ? <p style={{ color: "red" }}>{propertyError}</p> : null} */}


            <label htmlFor="" className="label">
              Property Name :
            </label>
            <FormInput
              type="text"
              required
              placeholder="Enter Text..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            <label htmlFor="" className="label">
              Property Address
            </label>
            <FormInput
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="" className="label">
              City
            </label>
            <FormInput
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label htmlFor="" className="label">
              State
            </label>
            <FormInput
              type="text"
              placeholder="State"
              required
              value={statetxt}
              onChange={(e) => setStatetxt(e.target.value)}
            />
            <label htmlFor="" className="label">
              Zip Cod
            </label>
            <FormInput
              type="text"
              placeholder="Zip Code"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />


            <div className="form-buttons">
              {
                creatingProperty ?
                  <p style={{ fontWeight: "bold" }}>Updating property. please wait....</p>
                  :
                  <Button type="main">
                    Update
                  </Button>

              }
            </div>
          </form>
        </div>
      </div>
      {showPopupDelete && <DeleteModal />}
    </div>
  );
};

export default UpdateProperty;
