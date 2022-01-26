import React, { useEffect } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";


import "./home.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../redux/actions/activityAction";
import { connect } from "react-redux";

const Home = (props) => {


  useEffect(() => {
   const property_id = props.match.params.property_id;
  //  ?props.history.push('/')
    // console.log(props.token)
    if (props.token){ 
      props.fetchAllActivities(props.token,property_id);
    }
  },[props.token]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Home</h2>
      </div>
      <div className="home-container">
        <div className="home-search">
          <label htmlFor="">Enter date : </label>
          <div className="home-search-control">
            <FormInput type="date" />
            <button>Submit</button>
          </div>
        </div>
        <div className="home-content">
          <div className="home-head-card">
            <div className="home-head-card-left">
              <div>Today</div>
              <span class="material-icons">settings</span>
            </div>
            <div className="home-head-card-right">
              <Button type="main">Reports</Button>
            </div>
          </div>
          <div className="home-cards-list">
            {
              props.activityLoading ? 
              <p>Loading activities .....</p>
              :
 props.activities.length > 0 ?
            
  props.activities.map((activity) => (
    <div className="home-card" key={activity.pk}>
      <div className="home-card-header">
        <div className="home-card-left">
          <div className="home-card-img">
            <img
              src={`http://homebuilder.herokuapp.com${activity.image}`}
              alt=""
            />
          </div>
          <div className="home-card-info">
            <div className="home-card-title">
              {activity.milestone_name}
            </div>
            <div className="home-card-subtitle">
              {activity.description}
            </div>
          </div>
        </div>
        <div className="home-card-right">
          <span class="material-icons">dns</span>
          <span class="material-icons">attach_money</span>
        </div>
      </div>
      <div className="home-card-detail"></div>
    </div>
  ))
  :
  <h6 style={{marginTop:'1rem'}}>No Activity Found</h6>

            }
            
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state =>{
  return {
    'token':state.authReducer.token,
    'activities':state.activityReducer.activities,
    'activityError':state.activityReducer.error,
    'activityLoading':state.activityReducer.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return {
 'fetchAllActivities':(token,property_id)=>dispatch(fetchActivities({token,property_id}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
