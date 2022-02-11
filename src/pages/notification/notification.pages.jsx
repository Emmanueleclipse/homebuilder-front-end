import React from 'react'
import axios from "../../axios"
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
const Notification=(props)=> {
const { user, token } = useSelector((state) => state.authReducer);

useEffect(()=>{
  axios.get("/notification/notifications/",{ headers: { Authorization: `Bearer ${token}` }}).then(e => console.log(e))
},[])

  return (
    <div className="dashboard-page">
         <div className="dashboard-page-heading">
        <h2>Notification</h2>
      </div>   
    </div>
  )
}
export default Notification