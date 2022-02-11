import React, { useEffect } from "react";
import "../side-bar/side-bar.styles.scss";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/actions/authAction";
import HomeOwner from "./homeOwner/homeOwner"
import HomeBuilder from "./homeBuilder/homeBuilder";

const SideBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => { }, [user]);
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <div className="side-bar-container">
      {user?.role === "HOMEOWNER"?
      <HomeOwner/>:
      <HomeBuilder/>
    } 
    </div>
  
  );
};

export default SideBar;
