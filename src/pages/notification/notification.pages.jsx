import React from 'react'
import axios from "../../axios"
import { useEffect } from 'react'
import { useSelector } from "react-redux";
import "./notification.styles.css"
const Notification=()=> {
const {  token } = useSelector((state) => state.authReducer);

useEffect(()=>{
  axios.get("/notification/notifications/",{ headers: { Authorization: `Bearer ${token}` }}).then(e => console.log(e))
},[])

  return (
    <div className="dashboard-page">
         <div className="dashboard-page-heading">
<<<<<<< HEAD
        <h2>Notifications</h2>
=======
        <h2>Notification</h2>
      </div>
      <div className="general-container">

      <div className='notification-container'>
        <div>
        <h6>
          Milestone Acepted
        </h6>
        <p>12 FEB, 2022</p>
        </div>
        <div>
          <span class="material-icons">cancel</span>
        </div>
     
     
     
      </div>
     
      <div className='notification-container'>
        <div>
        <h6>
          Milestone Acepted
        </h6>
        <p>12 FEB, 2022</p>
        </div>
        <div>
          <span class="material-icons">cancel</span>
        </div>
     
     
     
      </div>
     
      <div className='notification-container'>
        <div>
        <h6>
          Milestone Acepted
        </h6>
        <p>12 FEB, 2022</p>
        </div>
        <div>
          <span class="material-icons">cancel</span>
        </div>
     
     
     
      </div>
     
>>>>>>> 8d474462d20f15c08d12dcf1e966fb6b8d4c972d
      </div>   
      
    </div>
  )
}
<<<<<<< HEAD
export default notification
=======
export default Notification
>>>>>>> 8d474462d20f15c08d12dcf1e966fb6b8d4c972d
