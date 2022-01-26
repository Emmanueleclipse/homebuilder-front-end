import React from "react";
import Button from "../../components/button/button.component";
import SimpleInput from "../../components/simple-input/simple-input.component";
import "./reset-password.styles.scss";
import { useState } from "react";
import axios from "../../axios";
import { useSelector } from "react-redux";
const ResetPassword = () => {
  const [email, setEmail] = useState(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    let datatosend = {
      "email": email
    }

    try {
      let res = await axios({
        method: 'post',
        url: '/auth/password/reset/',
        data: datatosend
      });

      let data = res.data;
      console.log(res.data)
      setMessage("Mail Sent ")
      return data;
    } catch (error) {
      console.log(error); // this is the main part. Use the response property from the error object
      setMessage("Failed to sent")
      return error.response;
    }



  }
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Reset Password</h2>
      </div>
      <div className="activity-container">
        <div className="activity-card reset-container">
          <h6 style={{color:'red'}}>{message ? message : null}</h6>
          <div className="setting-title">
            <h4 className="text-align-center  mb-5">Send Reset Link</h4><br />

          </div>
          <form action="" className="reset-form" onSubmit={handleSubmit}>

            <SimpleInput
              type="email"
              name="email"
              required
              placeholder="email"

              onChange={(e) => setEmail(e.target.value)}

            />


            <div className="form-buttons">
              <Button type="main">Reset</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
