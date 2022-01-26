import React from "react";
import { Link } from "react-router-dom";
import "./mobile-bar.styles.scss";

const MobileBar = () => {
  return (
    <div className="for-mobile mobile-bar">
      <Link to="/">
        <div className="mobile-bar-item">
          <div className="mobile-bar-item-icon">
            <span class="material-icons">home</span>
          </div>
          <div className="mobile-bar-item-label">Home</div>
        </div>
      </Link>
      <Link to="/messages">
        <div className="mobile-bar-item">
          <div className="mobile-bar-item-icon">
            <span class="material-icons">question_answer</span>
          </div>
          <div className="mobile-bar-item-label">Messages</div>
        </div>
      </Link>
      <Link to="/activity">
        <div className="mobile-bar-item">
          <div className="mobile-bar-item-icon">
            <span class="material-icons">calendar_today</span>
          </div>
          <div className="mobile-bar-item-label">Activity</div>
        </div>
      </Link>
      <Link to="/crew">
        <div className="mobile-bar-item">
          <div className="mobile-bar-item-icon">
            <span class="material-icons">assignment</span>
          </div>
          <div className="mobile-bar-item-label">Crew</div>
        </div>
      </Link>
      <Link to="/more">
        <div className="mobile-bar-item">
          <div className="mobile-bar-item-icon">
            <span class="material-icons">more_horiz</span>
          </div>
          <div className="mobile-bar-item-label">More</div>
        </div>
      </Link>
    </div>
  );
};

export default MobileBar;
