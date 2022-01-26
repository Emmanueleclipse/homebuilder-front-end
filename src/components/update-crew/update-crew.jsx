import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_POPUP_UPDATE, UpdateCrew } from "../../redux/actions/crewAction";
import { fetchProperties } from "../../redux/actions/propertyAction";
import Button from "../button/button.component";
import SimpleInput from "../simple-input/simple-input.component";
import "./update-crew.scss";
const UpdateCrewComponent = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const { properties } = useSelector((state) => state.propertyReducer);
  const { payloadToUpdate } = useSelector((state) => state.crewReducer);

  const [senderEmail, setsenderEmail] = useState("");

  const [property, setProperty] = useState(0);

  useEffect(() => {
    console.log(payloadToUpdate)
    dispatch(fetchProperties({ token: token }));
  }, [dispatch, token]);
  useEffect(() => {
    setsenderEmail(payloadToUpdate?.user?.email)
    setProperty(payloadToUpdate?.property)

  }, [payloadToUpdate?.pk]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const crewObj = {
      user: senderEmail,
      property: property,

    };
    dispatch(UpdateCrew({ crew: crewObj, token: token, id: payloadToUpdate?.pk }));
  };
  return (
    <div className="popup-overlay auth-page popup-crew">
      <div className="auth-page-container invite-container">
        <div
          className="close-icon-container"
          onClick={() => {
            dispatch(TOGGLE_POPUP_UPDATE({ payloadToUpdate: null }))
          }}
        >
          <span class="material-icons">close</span>
        </div>
        <div>
          <h2>Update Crew Members</h2>

          <form onSubmit={handleSubmit} action="" className="auth-form">
            <SimpleInput
              type="email"
              value={senderEmail}
              onChange={(e) => setsenderEmail(e.target.value)}
              name="user"
              required
              placeholder="Email"
            />

            <label htmlFor="" className="label">
              Property :
            </label>
            <select
              required
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="select-input"
              name="property"
              id=""
            >
              <option value="">Select property</option>
              {properties.map((el) => (
                <option key={el.pk} value={el.pk}>
                  {el.name}
                </option>
              ))}
            </select>


            <div className="form-buttons">

              <Button type="main">Update</Button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCrewComponent;
