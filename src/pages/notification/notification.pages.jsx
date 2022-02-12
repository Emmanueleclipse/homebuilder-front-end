import React from 'react'
import axios from "../../axios"
import { useEffect,useState } from 'react'
import { useSelector } from "react-redux";
import "./notification.styles.css"
const Notification=()=> {
const {  token } = useSelector((state) => state.authReducer);
const [notifications,setNotifications]=useState([])
const handleDeleteNotification=(index)=>{
  const notifi = notifications.filter(e=>e.pk !==index)
  setNotifications(notifi)
}
useEffect(()=>{
  axios.get("/notification/notifications/",{ headers: { Authorization: `Bearer ${token}` }}).then(e => {
    
    setNotifications(e.data)
    console.log(e.data)
  })
},[])

  return (
    <div className="dashboard-page">
         <div className="dashboard-page-heading">
        <h2>Notification</h2>
      </div>
      <div className="general-container">

{notifications.map((item,index)=>{
  return(
    <div
    key={index}
     className='notification-container'>
    <div>
    <h6>
    {item.title}
    </h6>
    <p>{item.created_at}</p>
    </div>
    <div>
      <span onClick={()=> handleDeleteNotification(item.pk)} class="material-icons">cancel</span>
    </div>

  </div>
  )
})}
    
     
     
      </div>   
      
    </div>
  )
}
export default Notification