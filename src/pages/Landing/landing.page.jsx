import React from "react";
import Button from "../../components/button/button.component";
import { NavLink } from "react-router-dom";
import "./landing.styles.scss";
const Landing = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page">
        <h1 className="landing-page-heading">Which best describes you ?</h1>
        <div className="landing-icon">
          <span class="material-icons">person</span>
        </div>
        <div className="landing-buttons">
          <NavLink to="/register">
            <Button type="main">Home owner</Button>
          </NavLink>
          <NavLink to="/register?type=builder">
            <Button type="secondary">Home builder</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;
