import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchActivities } from "../../redux/actions/activityAction";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import Activity from "../Activity/activity.page";
import { parse } from "@babel/core";
import "./details.styles.scss";

const Details = (props) => {
  const [property, setProperty] = useState({});
  const [activity, setActivity] = useState({});
  const [showDescription, setShowDescription] = useState("hidden");
  const [myHeight_description, setMyHeight_description] = useState(0);
  const [myHeight_images, setMyHeight_images] = useState(0);
  const [imgs, setImgs]=useState([])
  const [docs, setDocs]=useState([])

  const [myHeight_doc, setMyHeight_doc] = useState(0);
  const toggleVelocity = 10;

  useEffect(() => {
    const activity_id = props.match.params.activity_id;
    const property_id = props.match.params.property_id;

    if (props.token) {
      axios
        .get("api/property/" + property_id, {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then((res) => {
          setProperty(res.data);

          let act = res.data.activities.filter(
            (item) => item.pk === parseInt(activity_id)
          );
          setActivity(act[0]);
          console.log(
            res.data.activities.filter(
              (item) => item.pk === parseInt(activity_id)
            )
          );
          activity.attachments.map((item) => {
            let types=['jpg','png']
            
            let arr = activity.attachments.filter(i=>  types.includes(i.type))
            let arrDoc = activity.attachments.filter(i=>  !types.includes(i.type))

            setImgs(arr)
            setDocs(arrDoc)
            return 0;
          })
        })
        .catch((err) => console.log(err));
    }
  }, [props.token]);

  const showDesc = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    console.log(myHeight_description);
    if (myHeight_description > 0) {
      for (let i = 200; i >= 0; i -= toggleVelocity) {
        setMyHeight_description(i);

        await delay(1);
      }
    } else {
      for (let i = 0; i <= 200; i += toggleVelocity) {
        setMyHeight_description(i);

        await delay(1);
      }
    }
  };
  const showDoc = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    if (myHeight_doc > 0) {
      for (let i = 200; i >= 0; i -= toggleVelocity) {
        setMyHeight_doc(i);

        await delay(1);
      }
    } else {
      for (let i = 0; i <= 250; i += toggleVelocity) {
        setMyHeight_doc(i);
        console.log(myHeight_doc);
        await delay(1);
      }
    }
  };

  const showImages = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    console.log(myHeight_description);
    if (myHeight_images > 0) {
      for (let i = 200; i >= 0; i -= toggleVelocity) {
        setMyHeight_images(i);

        await delay(1);
      }
    } else {
      for (let i = 0; i <= 250; i += toggleVelocity) {
        setMyHeight_images(i);
        console.log(myHeight_images);
        await delay(1);
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading custom-heading">
        <h2>Details</h2>
      </div>

      <div className="details-container custom-container">
        <div className="feed-main-card-div my-3 px-3 pt-3 pb-4">
          <p className="fw-bold mb-3" style={{ color: "#398d63" }}>
            {property.name}
          </p>
          <div className="d-sm-flex card-inner-details justify-content-between">
            <div className="text-cont">
              <p className="">{property.address}</p>
              <p className="mb-2 ">
                {activity._from} {activity._to}
              </p>
            </div>
          </div>
          <div className="btn-section">
            <button onClick={() => showDesc()} style={{ display: "flex" }}>
              {" "}
              <span>Description</span>{" "}
            </button>
            <button className="arrow" onClick={() => showDesc()}>
              <span
                class="material-icons"
                style={{
                  display: myHeight_description < 200 ? "block" : "none",
                }}
              >
                keyboard_arrow_down
              </span>
              <span
                class="material-icons"
                style={{
                  visibility:
                    myHeight_description === 200 ? "visible" : "hidden",
                }}
              >
                keyboard_arrow_up
              </span>
            </button>
          </div>
        </div>

        <div
          className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4"
          id="description"
          style={{ height: myHeight_description }}
        >
          <p>{activity.description}</p>
        </div>
        <div
          className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4"
          id="btnImages"
          style={{ height: 40 }}
        >
          <div className="btn-section">
            <button onClick={() => showImages()} style={{ display: "flex" }}>
              {" "}
              <span>Images/Video</span>{" "}
            </button>
            <button className="arrow" onClick={() => showImages()}>
              <span
                class="material-icons"
                style={{ display: myHeight_images < 200 ? "block" : "none" }}
              >
                keyboard_arrow_down
              </span>
              <span
                class="material-icons"
                style={{
                  visibility: myHeight_images === 250 ? "visible" : "hidden",
                }}
              >
                keyboard_arrow_up
              </span>
            </button>
          </div>
        </div>
        <div
          className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4"
          id="images"
          style={{ height: myHeight_images }}
        >
          {activity.attachments !== undefined && (
            <ul style={{listStyle:'none'}}>
              {activity.attachments.map((item, i) => {
                let types=['jpg','png','gif']
                let strIndex = item.attachment
                  .split("")
                  .reverse()
                  .join("")
                  .indexOf("/");
                let name = item.attachment
                  .split("")
                  .reverse()
                  .join("")
                  .slice(0, strIndex);
                console.log(name.split("").reverse().join(""));
                return (
                  <>
                    <li>
                    {types.includes(item.type) &&
                        <img src={`https://homebuilder.herokuapp.com${item.attachment}`} width='300' height='300' alt="" />
                    }
                   
                  </li>
                  <br />
                  </>
                  
                );
              })}
            </ul>
          )}
        </div>
        <div
          className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4"
          id="btnDoc"
          style={{ height: 40 }}
        >
          <div className="btn-section">
            <button onClick={() => showDoc()} style={{ display: "flex" }}>
              {" "}
              <span>Pdf,Doc,Svg</span>{" "}
            </button>
            <button className="arrow" onClick={() => showDoc()}>
              <span
                class="material-icons"
                style={{ display: myHeight_doc < 200 ? "block" : "none" }}
              >
                keyboard_arrow_down
              </span>
              <span
                class="material-icons"
                style={{
                  visibility: myHeight_doc === 250 ? "visible" : "hidden",
                }}
              >
                keyboard_arrow_up
              </span>
            </button>
          </div>

          <button onClick={() => showDoc()} style={{ display: "flex" }}>
            {" "}
            <span>Pdf,Doc,Csv</span>
            <span
              class="material-icons"
              style={{ display: myHeight_images < 250 ? "block" : "none" }}
            >
              keyboard_arrow_down
            </span>
            <span
              class="material-icons"
              style={{
                visibility: myHeight_doc === 250 ? "visible" : "hidden",
              }}
            >
              keyboard_arrow_up
            </span>
          </button>
        </div>
        <div
          className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4"
          id="doc"
          style={{ height: myHeight_doc }}
        >
          {activity.attachments !== undefined && (
            <ul>
              {activity.attachments.map((item, i) => {
                let types=['jpg','png','gif']
                let strIndex = item.attachment
                  .split("")
                  .reverse()
                  .join("")
                  .indexOf("/");
                let name = item.attachment
                  .split("")
                  .reverse()
                  .join("")
                  .slice(0, strIndex);
                console.log(name.split("").reverse().join(""));
                return (
                  <li>
                    {!types.includes(item.type) &&
                         <a
                         href={`https://homebuilder.herokuapp.com${item.attachment}`}
                       >
                         {name.split("").reverse().join("")}
                       </a>
                    }
                   
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    activities: state.activityReducer.activities,
    activityError: state.activityReducer.error,
    activityLoading: state.activityReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllActivities: (token, property_id) =>
      dispatch(fetchActivities({ token, property_id })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
