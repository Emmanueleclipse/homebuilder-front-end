import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { fetchActivities } from "../../redux/actions/activityAction";
import axios from "../../axios"
import React, { useEffect , useState} from "react";


 const Details=(props)=> {
    const [property, setProperty]= useState({});
    const [activity, setActivity]= useState({})



  
    useEffect(() =>{
      const activity_id = props.match.params.activity_id;
      const property_id = props.match.params.property_id;

      if(props.token){
        axios.get("api/property/"+property_id, {
          headers: { Authorization: `Bearer ${props.token}` },
        }).then(res => {
          setProperty(res.data)
          res.data.activities.map(item=>{
            if(item.pk === activity_id){
              setActivity(item)
            }
          })
        }).catch(err=>console.log(err.response))
      }

      console.log(property, activity)

    },[props.token])
  
    return (
      <div>
        <h1>{property.name}- {activity.milestone_name}</h1>
      </div>
    )
  
}



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
export default connect(mapStateToProps, mapDispatchToProps)(Details);