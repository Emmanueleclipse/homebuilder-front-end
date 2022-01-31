import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { createProperty,fetchProperties } from "../../redux/actions/propertyAction";

import "./create-property.styles.scss";

const CreateProperty = ({ history }) => {

  const [name, setName] = useState("");
  const [statetxt, setStatetxt] = useState("");
  // const [homeowner, setHomeOwner] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const {
    error,
    creatingProperty: creatingProperty,
    propertyCreated: propertyCreated,
    loading: propertyLoading
  } = useSelector((state) => state.propertyReducer);
  const { token, loading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {

    if (token) dispatch(fetchProperties({ token: token }));
  }, [dispatch, token]);
  




  const handleSubmit = (e) => {
    e.preventDefault();
    const propertyObj = {
      name: name,
      state: statetxt,
      // homeowner,
      city: city,
      address: address,
      zip_code: zipCode
    };
    dispatch(createProperty({ property: propertyObj, token: token }));
  };

  return (
    <div className="dashboard-page create-property">
      {propertyCreated ? <Redirect to='/invite' /> : null}
      <div className="dashboard-page-heading">
        <h2>Property</h2>
      </div>
      <div className="activity-container">
        <div className="activity-card">
          <div className="setting-title">
            <h4 className="text-align-center  mb-5">Create Property</h4>
          </div>
          {creatingProperty ?
            <p style={{ fontWeight: "bold" }}>Creating property. please wait....</p>
            : error ? <p style={{ color: "red" }}>{error}</p> : null}
          <form onSubmit={handleSubmit}>
            {/* {propertyError ? <p style={{color:"red"}}>{propertyError}</p>:null} */}
            {/* <div className="form-ctrl setting-input">
              <label htmlFor="" className="label">
                Home Owner :
              </label>
              <FormInput
                type="text"
                placeholder="Enter Text..."
                value={homeowner}
                onChange={(e) => setHomeOwner(e.target.value)}
              />
            </div> */}
            <div className="form-ctrl setting-input">
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
            </div>
            <div className="form-ctrl setting-input">
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
            </div>
            <div className="form-ctrl form-ctrl-full setting-input">
              <FormInput
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-ctrl setting-input">
              <FormInput
                type="text"
                placeholder="State"
                required
                value={statetxt}
                onChange={(e) => setStatetxt(e.target.value)}
              />
              <FormInput
                type="text"
                placeholder="Zip Code"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="form-submit">
              {

                <Button disabled={propertyLoading} type="main">
                  Submit
                </Button>

              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
