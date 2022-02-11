import React from 'react'
import "./notification.styles.css"
const notification=()=> {
  return (
    <div className="dashboard-page">
         <div className="dashboard-page-heading">
        <h2>Notifications</h2>
      </div>
    <div className="notification-container">
  
   
    <div className="notification-card">
      <div>

      <h6 className="notification-tittle">
        Milestone accepted
        </h6>
        <p className="notification-date">
          10 fev,2022
        </p>
      </div>
     
        <span class="material-icons">cancel</span>
    </div>
    </div>
    </div>
  )
}
export default notification