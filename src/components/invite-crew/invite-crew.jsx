import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";
import SimpleInput from "../../components/simple-input/simple-input.component";
import { crewTypes } from "../../redux/types/crew.types";
import { createCrew } from "../../redux/actions/crewAction";
import { fetchProperties } from "../../redux/actions/propertyAction";
import "./invite-crew.scss";

const InviteCrew = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const {
    properties
  } = useSelector((state) => state.propertyReducer);

  const { error, success } = useSelector((state) => state.crewReducer);

  const [senderEmail, setsenderEmail] = useState("");

  const [property, setProperty] = useState(0);

  useEffect(() => {

    dispatch(fetchProperties({ token: token }));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const crewObj = {
      receiver: senderEmail,
      property: property,
      invitation_type: "crew",
      redirect_link: "https://homebuilder.herokuapp.com/auth/login/"




    };
    dispatch(createCrew({ crew: crewObj, token: token }));

    setsenderEmail("");
    setProperty(0)
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
          <h2>Invite Crew Members</h2>



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

              <Button type="main">Send Invite </Button>
              {success ? <p style={{ color: 'green' }}>Crew added sucessfully..!</p> : null}
              {error ? <p style={{ color: 'red' }}>{error}</p> : null}

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteCrew;
