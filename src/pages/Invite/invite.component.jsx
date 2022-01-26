import React from "react";
import SimpleInput from "../../components/simple-input/simple-input.component";
import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";
import "./invite.styles.scss";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { resetProperty } from "../../redux/actions/propertyAction";
import { useSelector, useDispatch } from "react-redux";
const Invite = ({ history, match }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const [email, setEmail] = useState(null);
  const [errorInvite, setErrorInvite] = useState(null);
  const [success, setSucess] = useState(false);
  const {
    propertyID: id
  } = useSelector((state) => state.propertyReducer);
  useEffect(() => {
    if (!user) history.push("/login");
    dispatch(resetProperty())
  }, [user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      property: id,
      receiver: email,
      invitation_type: "homeowner",
      redirect_url: "https://homeweb.herokuapp.com/login"
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post('/api/invite-send/', data, config).then((response) => {

      setSucess(true);
      setTimeout(() => {
        history.push('/')
      }, 2000)
    }).catch((error) => {

      if (error.response.data.detail) {
        setErrorInvite(error.response.data.detail)
      } else if (error.response.data.receiver) {
        setErrorInvite(error.response.data.receiver[0])
      }

    })
  }
  return (
    <div className="auth-page">
      <div className="auth-page-container invite-container">
        <h2>Invite Home Owner</h2>
        <p>Enter Email to invite home owner</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {errorInvite ? <p style={{ color: 'red' }}>{errorInvite}</p> : null}
          {success ? <p style={{ color: 'aquamine' }}>Invite sent sucessfully..!</p> : null}
          <SimpleInput onChange={(event) => setEmail(event.target.value)} type="email" name="email" required placeholder="Email" />

          <div className="form-buttons">

            <Button type="main">Invite</Button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Invite;
