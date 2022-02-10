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
  const [myHeight_doc, setMyHeight_doc]=useState(0)


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
      for(let i=200;i>=0;i-=2.5){

        setMyHeight_description(i)
  
        await delay(1);
  
  
      }
    }else{
      for(let i=0;i<=200;i+=2.5){

        setMyHeight_description(i)
  
        await delay(1);
  
  
      }
    }
    
  }
  const showDoc=async()=>{
    const delay = ms => new Promise(res => setTimeout(res, ms));
    console.log(myHeight_doc)
    if(myHeight_doc>0){
      for(let i=200;i>=0;i-=2.5){

        setMyHeight_doc(i)
  
        await delay(1);
  
  
      }
    }else{
      for(let i=0;i<=200;i+=2.5){

        setMyHeight_doc(i)
  
        await delay(1);
  
  
      }
    }
    
  }

  const showImages=async()=>{
    const delay = ms => new Promise(res => setTimeout(res, ms));
    console.log(myHeight_description)
    if(myHeight_images>0){
      for(let i=200;i>=0;i-=2.5){

        setMyHeight_images(i)
  
        await delay(1);
  
  
      }
    }else{
      for(let i=0;i<=250;i+=2.5){

        setMyHeight_images(i)
  
        await delay(1);
  
  
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
          <button onClick={()=>showDesc()} style={{display:'flex'}}> <span >description</span> <span class='material-icons' style={{display:myHeight_description<200?'block':'none'}}>keyboard_arrow_down</span>
          <span class='material-icons' style={{visibility:myHeight_description===200?'visible':'hidden'}}>keyboard_arrow_up</span></button>
        </div>

        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id="description" style={{height:myHeight_description}} >
          <p>{activity.description}</p>

        </div>
        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id='btnImages' style={{height:40}} >
          <button onClick={()=>showImages()} style={{display:'flex'}}> <span>Images/Video</span><span class='material-icons' style={{display:myHeight_images<250?'block':'none'}}>keyboard_arrow_down</span>
          <span class='material-icons' style={{visibility:myHeight_images===250?'visible':'hidden'}}>keyboard_arrow_up</span></button>
       

        </div>
        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id='images'  style={{height:myHeight_images}} >
        

        </div>
        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id='btnDoc' style={{height:40}} >
          <button onClick={()=>showDoc()} style={{display:'flex'}}> <span>Pdf/Doc/Svg</span><span class='material-icons' style={{display:myHeight_images<250?'block':'none'}}>keyboard_arrow_down</span>
          <span class='material-icons' style={{visibility:myHeight_doc===250?'visible':'hidden'}}>keyboard_arrow_up</span></button>
       

        </div>
        <div className="feed-main-card-div card-toggle my-3 px-3 pt-3 pb-4" id='doc'  style={{height:myHeight_doc}} >
        

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
