import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { NavLink } from "react-router-dom";
import "./add-message.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/actions/propertyAction";
import { createMessage } from "../../redux/actions/messageActions";

const AddMessage = ({ history }) => {
  const [property, setProperty] = useState("");
  const [send_to, setSend_to] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const {
    properties,
    error: propertyError,
    loading: propertyLoading,
  } = useSelector((state) => state.propertyReducer);
  const {
    success,
    error: messageError,
    loading: messageLoading,
  } = useSelector((state) => state.messageReducer);
  const { user,token, error, loading } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(fetchProperties({ token: token }));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageObj = {
      property,
      subject,
      send_to,
      send_by: user.email,
      message,
    };
    dispatch(createMessage({ message: messageObj, token: token }));
  };
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>
          <NavLink className="btn-link" to="/messages">
            Message
          </NavLink>{" "}
          - New Message
        </h2>
      </div>
      <div className="activity-container">
        <div className="activity-card">
          <form onSubmit={handleSubmit}>
            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Property :
              </label>
              <select
                required
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="select-input"
                name=""
                id=""
              >
                <option value="">Select property</option>
                {properties.map((el) => (
                  <option key={el.pk} value={el.pk}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Send To :
              </label>
              <FormInput
                type="text"
                placeholder="Enter Email"
                required
                value={send_to}
                onChange={(e) => setSend_to(e.target.value)}
              />
            </div>
            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Subject :
              </label>
              <FormInput
                type="text"
                placeholder="Enter Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-ctrl form-ctrl-textarea">
              <label htmlFor="" className="label">
                Message :
              </label>
              <textarea
                name=""
                id=""
                cols="25"
                rows="2"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Upload media :
              </label>
              <div className="file-upload-btn">
                <label htmlFor="file-upload">Select file</label>
                <input type="file" id="file-upload" />
              </div>
            </div>
            <div className="form-submit">
              <Button disabled={messageLoading} type="main">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMessage;
