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
  const [showDescription, setShowDescription] = useState('hidden');
  const [myHeight_description, setMyHeight_description]=useState(0)
  const [myHeight_images, setMyHeight_images]=useState(0)

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
        })
        .catch((err) => console.log(err));
    }
  }, [props.token]);

  const showDesc=async()=>{
    const delay = ms => new Promise(res => setTimeout(res, ms));
    console.log(myHeight_description)
    if(myHeight_description>0){
      for(let i=200;i>=0;i--){

        setMyHeight_description(i)
  
        await delay(1);
  
  
      }
    }else{
      for(let i=0;i<=200;i++){

        setMyHeight_description(i)
  
        await delay(5);
  
  
      }
    }
    
  }

  const showImages=async()=>{
    const delay = ms => new Promise(res => setTimeout(res, ms));
    console.log(myHeight_description)
    if(myHeight_images>0){
      for(let i=200;i>=0;i--){

        setMyHeight_images(i)
  
        await delay(1);
  
  
      }
    }else{
      for(let i=0;i<=250;i++){

        setMyHeight_images(i)
  
        await delay(5);
  
  
      }
    }
    
  }



  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading custom-heading">
        <h2>Details</h2>
      </div>

      <div className="details-container custom-container">
        <div className="feed-main-card-div my-3 px-3 pt-3 pb-4">
          <p className="text-center mb-3">{property.name}</p>
          <div className="d-sm-flex card-inner-details justify-content-between">
            <div className="text-cont">
              <p className="fw-bold">{property.address}</p>
              <p className="mb-2 ">
                {activity._from} {activity._to}
              </p>
            </div>
          </div>
          <button onClick={()=>showDesc()}>description</button>
        </div>

        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id="description" style={{height:myHeight_description}} >
          <p>{activity.description}</p>

        </div>
        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id='btnImages' style={{height:40}} >
          <button onClick={()=>showImages()}>Images/Video</button>
       

        </div>
        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id='images'  style={{height:myHeight_images}} >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, voluptatem dolore temporibus quia accusantium eveniet, consequuntur repellendus adipisci accusamus autem reprehenderit vero dolores voluptatibus et, sit veniam animi explicabo ea!
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt rerum, beatae nisi quas, atque a excepturi quidem cumque repudiandae eos ratione nihil voluptatum neque debitis dolor laboriosam quia ad! Perferendis!
       

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
