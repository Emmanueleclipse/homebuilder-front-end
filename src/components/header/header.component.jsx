import React from "react"
import { useState } from "react";
import Person from "../../assets/images/person.jpg";
import { Link } from "react-router-dom";
import ArrowMenu from "../arrow-menu/arrow.menu";
import axios from "../../axios";
import Badge from '@mui/material/Badge';
import "./header.styles.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Header = () => {
  const { user ,token} = useSelector((state) => state.authReducer);
  const [countNotification,setCountNotification]=useState(5)
  const [dot,setDot]=useState(true)
  function not(){
    console.log(countNotification)
    axios.get("/notification/notifications/",{ headers: { Authorization: `Bearer ${token}` }}).then(e => {
    if(e.data.length >countNotification){
      setCountNotification(e.data.length)
      setDot(false)
//console.log(e.data.length)

    }
    })
  }
  useEffect(()=>{
    not()
  },[])
  //setInterval(not, 5000);
  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">Homes</div>
        <div className="search-container">
          <span class="material-icons">search</span>
          <input type="text" placeholder="Search..." name="search" />
        </div>
      </div>
      <div className="header-right">
        <Link to="/messages">
          <div className="chat-icon">
            <span class="material-icons">chat</span>
          </div>
        </Link>
        <Link
        onClick={()=>setDot(true)}
        to="notification">
        <div className="notification-icon">
        <Badge style={{marginTop:"-.6vw"}} color='error'variant="dot" invisible={dot}>
        <span class="material-icons">notifications</span>
        </Badge>
          
        </div>
        </Link>
        <div
          className="header-user-profile"
         
        >
          <div className="user-avatar">
            <img src={Person} alt="" />
          </div>
          <div className="user-name">{user?.name}</div>
          <div >
            <ArrowMenu/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
