import React from "react"
import Person from "../../assets/images/person.jpg";
import { Link } from "react-router-dom";
import ArrowMenu from "../arrow-menu/arrow.menu"
import "./header.styles.scss";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.authReducer);

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
        <Link to="notification">
        <div className="notification-icon">
          <span class="material-icons">notifications</span>
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
