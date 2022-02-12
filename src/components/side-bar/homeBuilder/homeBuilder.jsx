
import React from "react";
import "../../side-bar/side-bar.styles.scss";
import { Link } from "react-router-dom";
const HomeBuilder=()=> {
  return (
    <>
        <Link to="/">
          <div className="side-bar-item">
            <div className="side-bar-item-icon">
              <span class="material-icons">home</span>
            </div>
            <div className="side-bar-item-label">Feed</div>
          </div>
        </Link>
        <Link to="/activity">
          <div className="side-bar-item">
            <div className="side-bar-item-icon">
              <span class="material-icons">calendar_today</span>
            </div>
            <div className="side-bar-item-label">Create Milestone</div>
          </div>
        </Link>
        <Link to="/property/add">
          <div className="side-bar-item">
            <div className="side-bar-item-icon">
              <span class="material-icons">people</span>
            </div>
            <div className="side-bar-item-label">Create Property</div>
          </div>
        </Link>
        <Link to="/property">
          <div className="side-bar-item">
            <div className="side-bar-item-icon">
              <span class="material-icons">save_alt</span>
            </div>
            <div className="side-bar-item-label">Manage Property</div>
          </div>
        </Link>

        <Link to="/">
          <div className="side-bar-item">
            <div className="side-bar-item-icon">
              <span class="material-icons">help_outline</span>
            </div>
            <div className="side-bar-item-label">Help and Resources</div>
          </div>
        </Link>
      </>
  )
}

export default HomeBuilder