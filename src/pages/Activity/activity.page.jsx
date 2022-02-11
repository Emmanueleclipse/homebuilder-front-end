import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { createActivity } from "../../redux/actions/activityAction";
import { fetchProperties } from "../../redux/actions/propertyAction";
import "./activity.styles.scss";


const Activity = ({history }) => {
  const dispatch = useDispatch();
  const [property, setProperty] = useState("");
  const [milestone_name, setmilestone_name] = useState("");
  const [description, setDescription] = useState("");
  const [_from, set_from] = useState("");
  const [_to, set_to] = useState("");
  const [file, set_file] = useState("");
  const [status, set_status] = useState("ongoing");
  const [submitted, setSubmitted] = useState(false);
  const [popup, setpopup] = useState(false);

  const { token, error, loading } = useSelector((state) => state.authReducer);
  const [milestoneError,setMilestoneError] = useState('');
  const {
    success,
    activityCreated:activityCreated,
    creatingActivity:creatingActivity,
    error: activityError,
    loading: activityLoading,
  } = useSelector((state) => state.activityReducer);
  const {
    properties,
    error: propertyError,
    loading: propertyLoading,
  } = useSelector((state) => state.propertyReducer);

  useEffect(() => {
 
    dispatch(fetchProperties({ token: token }));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!milestone_name){
      setMilestoneError("please milestone name is required")
      return false;
    }

    const activity = new FormData();
  
    activity.append("property", property);
    activity.append("description", description);
    activity.append("milestone_name", milestone_name);
    activity.append("status", status);
    activity.append("submitted", submitted);
    activity.append("_from", _from);
    activity.append("_to", _to);
    activity.append("image", file);
    
    dispatch(createActivity({ activity, token: token }));
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Create Activity</h2>
      </div>
      <div className="activity-container">
        <div className="activity-card">
          <form onSubmit={handleSubmit}>
           {milestoneError ?<p style={{color:'red'}}>{milestoneError}</p>:null}
           {activityError ? <p style={{color:'red'}}>{activityError}</p> :null }
            <div className="form-ctrl">
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
            </div>
            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Milestone :
              </label>
              <Button
                type="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setpopup(!popup);
                }}
              >
                {milestone_name ? <> {milestone_name}</> : <>Add Milestone</>}
              </Button>
            </div>

            <div className="form-ctrl">
              <div className="d-flex align-items-center">
                <label htmlFor="">From : </label>
                <FormInput
                  required
                  value={_from}
                  onChange={(e) => set_from(e.target.value)}
                  type="date"
                  name='_from'
                />
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="">To : </label>
                <FormInput
                  required
                  type="date"
                  value={_to}
                  onChange={(e) => set_to(e.target.value)}
                  name="_to"
                />
              </div>
            </div>
            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Submit :
              </label>
              <input
                checked={status}
                type="checkbox"
                onChange={() => setSubmitted(!submitted)}
              />
            </div>
            <div className="form-ctrl form-ctrl-textarea">
              <label htmlFor="" className="label">
                Description :
              </label>
              <textarea
                required
                name="description"
                id=""
                cols="50"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                {description}
              </textarea>
            </div>
            <div className="form-ctrl">
              <label htmlFor="" className="label">
                Upload media :
              </label>
              <div className="file-upload-btn">
                <label htmlFor="file-upload">Select file</label>
                <input
                  type="file"
                  id="file-upload"

                  onChange={(e) => set_file(e.target.files[0])}
                />
              </div>
            </div>
            <div className="form-submit">
              {
                creatingActivity ? 
                <p style={{fontWeight:"bold"}}>Creating activity. please wait....</p>
                :
                <Button type="main">
                Submit
              </Button>

              }
            
            
            </div>
          </form>
        </div>
      </div>
      {popup && (
        <>
          <div className="popup-overlay auth-page popup-crew">
            <div className="auth-page-container invite-container">
              <div
                className="close-icon-container"
                onClick={() => {
                  setpopup(!popup);
                  setmilestone_name("");
                }}
              >
                <span class="material-icons">close</span>
              </div>
              <div>
                <h2>Add Milestone</h2>
                <p>Enter name of milestone</p>
                <form>
                  <FormInput
                    value={milestone_name}
                    onChange={(e) => setmilestone_name(e.target.value)}
                    placeholder="Milestone"
                    required
                  />
                  <Button type="main" onClick={(e) => setpopup(!popup)}>
                    Add milestone
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Activity;
