import React, { useEffect } from "react";
import "../side-bar/side-bar.styles.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userTypes } from "../../redux/types/user.types";
import { logout } from "../../redux/actions/authAction";
const renderMenu = (role) => {
  // console.log(JSON.parse(localStorage.getItem("user")))
  if (role === "HOMEOWNER") {
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
    );
  } else {
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
    );
  }
};

const SideBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => { }, [user]);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="side-bar-container">
      {renderMenu(user?.role)}
      <div className="side-bar-item" onClick={handleLogout}>
        <div className="side-bar-item-icon">
          <span class="material-icons">logout</span>
        </div>
        <div className="side-bar-item-label">Logout</div>
      </div>
    </div>
  );
};

export default SideBar;
