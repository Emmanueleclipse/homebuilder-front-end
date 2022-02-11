import React from 'react'
import { Link } from "react-router-dom";
import "../../side-bar/side-bar.styles.scss";

const HomeOwner=()=> {
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
    <Link to="/property">
      <div className="side-bar-item">
        <div className="side-bar-item-icon">
          <span class="material-icons">calendar_today</span>
        </div>
        <div className="side-bar-item-label">My Property</div>
      </div>
    </Link>
    <Link to="/crew">
      <div className="side-bar-item">
        <div className="side-bar-item-icon">
          <span class="material-icons">people</span>
        </div>
        <div className="side-bar-item-label">My Crew</div>
      </div>
    </Link>
    <Link to="/">
      <div className="side-bar-item">
        <div className="side-bar-item-icon">
          <span class="material-icons">save_alt</span>
        </div>
        <div className="side-bar-item-label">Resources</div>
      </div>
    </Link>

    <Link to="/">
      <div className="side-bar-item">
        <div className="side-bar-item-icon">
          <span class="material-icons">help_outline</span>
        </div>
        <div className="side-bar-item-label">Help Center</div>
      </div>
    </Link>
  </>
  )
}

export default HomeOwner