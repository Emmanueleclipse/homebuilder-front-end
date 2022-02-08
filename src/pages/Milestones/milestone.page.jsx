import React, { useEffect } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";


import "./milestones.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../redux/actions/activityAction";
import { connect } from "react-redux";
import axios from "../../axios"
import { Link, useParams } from "react-router-dom";


const Milestones= (props) => {
  const [feeds, setFeeds] = React.useState([]);
  const [filter, setFilter] = React.useState('today')
  const { id } = useParams();

  let activities_arrr = [];
  function convertDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  function timeSetting(date){
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    return new Date(date_string);
  }

  const deleteMilestone =(item_toDelete)=>{
    setFeeds(feeds.filter(item=> item.activity_id!==item_toDelete.activity_id))
  }

  useEffect(() => {
    //const property_id = this.router.params.id;
    //  ?props.history.push('/')
    console.log(id)
    if (props.token) {
      axios.get("api/property/"+id, {
        headers: { Authorization: `Bearer ${props.token}` },
      }).then(res => {
        console.log(res.data)
        let property = res.data;
       
        let current_date = new Date();
        
        property.activities.map(item=>{

          activities_arrr.push({
            property_id: property.pk,
            property_name: property.name,
            address: property.address,
            activity_name: item.milestone_name,
            activity_status: item.status,
            date: item._to,
            created_at:item.created_at,
            //view_text: "Today",
            description : item.description,
            activity_id : item.pk
          })

          return true;

        })

        /*for (let i = 0; i < properties.length; i++) {
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
        }*/

        
          //sort for order from oldest to newest
          setFeeds(activities_arrr.sort((a, b) => {
            if (a.created_at > b.created_at) {
              return 1
            } else if (a.created_at < b.created_at) {
              return -1
            }
            return 0
          }))
        

        
        



      }).catch(err => console.log(err))
    }
  }, [props.token, filter]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading custom-heading">
        <button className='msgButton'>Messages</button>
        <hr />  
      </div>
     
      <div className="milestones-container custom-container">
        {feeds.length > 0 && (
          feeds.map((item, index) => (
            <div key={index} className="feed-main-card-div my-3 px-3 pt-3 pb-4">
              <p className="text-center mb-3">{item.view_text}</p>
              <div className="d-sm-flex card-inner-details justify-content-between">
                <div>
                  <p className="fw-bold">{index+1}) {item.activity_name}</p>
                  <p className="mb-2" style={{ color: item.activity_status !== "revision"? 'green': 'red'}}>{item.activity_status}</p>
                  <p>{item.date}</p>
                  
                  {/* <p>20</p> */}
                </div>
                {/*}
                <button className="btn-delete" onClick={()=>deleteMilestone(item)}> 
                   delete
          </button>*/}
              </div>
              <div className="btns-div d-sm-flex mt-3">

                <button className="btn-green-color" href="#" onClick={()=>console.log(item)} >Submit</button>
                

              </div>
            </div>
          ))
        )}
      </div>
      
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
export default connect(mapStateToProps, mapDispatchToProps)(Milestones);
