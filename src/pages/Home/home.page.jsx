import React, { useEffect } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";


import "./home.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../redux/actions/activityAction";
import { connect } from "react-redux";
import axios from "../../axios"
import { Link } from "react-router-dom";


const Home = (props) => {
  const [feeds, setFeeds] = React.useState([]);
  const [filter, setFilter] = React.useState('today')
  let activities_arrr = [];
  function convertDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  function timeSetting(date){
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    return new Date(date_string);
  }

  useEffect(() => {
    const property_id = props.match.params.property_id;
    //  ?props.history.push('/')
    console.log(filter)
    if (props.token) {
      axios.get("api/property/", {
        headers: { Authorization: `Bearer ${props.token}` },
      }).then(res => {
        console.log(res.data)
        let properties = res.data;
       
        let current_date = new Date();

        for (let i = 0; i < properties.length; i++) {
          let activities = properties[i].activities;

          if (activities.length > 0) {

            for (let j = 0; j < activities.length; j++) {
              let from_date = new Date(activities[j]._from);
               
              const diffTime = Math.abs(timeSetting(from_date) - timeSetting(current_date));
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays > 0 && (from_date > current_date || convertDate(current_date) === convertDate(from_date))) {
                console.log(activities[j].milestone_name, diffDays)

                if (diffDays === 1 ) {
                  activities_arrr.push({
                    property_id: properties[i].pk,
                    property_name: properties[i].name,
                    address: properties[i].address,
                    activity_name: activities[j].milestone_name,
                    activity_status: activities[j].status,
                    date: activities[j]._from,
                    view_text: "Today",
                    description : activities[j].description,
                    activity_id : activities[j].pk
                  })
                }

                if (diffDays === 2) {
                  activities_arrr.push({
                    property_id: properties[i].pk,
                    property_name: properties[i].name,
                    address: properties[i].address,
                    activity_name: activities[j].milestone_name,
                    activity_status: activities[j].status,
                    date: activities[j]._from,
                    view_text: "Tomorrow",
                    description : activities[j].description,
                    activity_id : activities[j].pk
                  })
                }

                if (diffDays > 2) {
                  activities_arrr.push({
                    property_id: properties[i].pk,
                    property_name: properties[i].name,
                    address: properties[i].address,
                    activity_name: activities[j].milestone_name,
                    activity_status: activities[j].status,
                    date: activities[j]._from,
                    view_text: activities[j]._from,
                    description : activities[j].description,
                    activity_id : activities[j].pk
                  })
                }
              }
            }
          }
        }

        if(filter==='today'){
          setFeeds(activities_arrr.filter(i=> i.view_text==='Today'))

        }else{
          setFeeds(activities_arrr.sort((a, b) => {
            if (a.date > b.date) {
              return 1
            } else if (a.date < b.date) {
              return -1
            }
            return 0
          }))

        }


      }).catch(err => console.log(err.response))
    }
  }, [props.token, filter]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading custom-heading">
        <label htmlFor="filters">Select View:</label>
        <select
          name="filters"
          className="select-input text-center"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">today</option>

          <option value="all">all</option>
        </select>
      </div>
     
      <div className="home-container custom-container">
        {feeds.length > 0 && (
          feeds.map((item, index) => (
            <div key={index} className="feed-main-card-div my-3 px-3 pt-3 pb-4">
              <p className="text-center mb-3">{item.view_text}</p>
              <div className="d-sm-flex card-inner-details justify-content-between">
                <div>
                  <p className="fw-bold">{item.property_name}</p>
                  <p className="mb-2">{item.address}</p>
                  <p>{item.activity_name}</p>
                  {/* <p>20</p> */}
                </div>
                <div className="feed-status">
                  <p>{item.activity_status}</p>
                </div>
              </div>
              <p className="mt-3 text-14 text-black-50">{item.description}</p>
              <div className="btns-div d-sm-flex mt-3">
                <Link className="btn-light-color" to={'milestoneDetails/'+item.property_id+'/'+item.activity_id}>
                  <a  href="">View Details</a>

                </Link>
                <Link to={"/milestones/"+item.property_id} className="btn-green-color">

                 <a  href="" onClick={()=>console.log(item)} >View Milestones</a>
                </Link>

              </div>
            </div>
          ))
        )}
      </div>
      {/* <div className="home-container">
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
                  <h6 style={{ marginTop: '1rem' }}>No Activity Found</h6>

            }

          </div>
        </div>
      </div> */}
    </div>
  );
};


const mapStateToProps = state => {
  return {
    'token': state.authReducer.token,
    'activities': state.activityReducer.activities,
    'activityError': state.activityReducer.error,
    'activityLoading': state.activityReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    'fetchAllActivities': (token, property_id) => dispatch(fetchActivities({ token, property_id }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
