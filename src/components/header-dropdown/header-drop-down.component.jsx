import React from "react";
import { useHistory } from "react-router-dom";
import "./header-drop-down.styles.scss";

const HeaderDropDown = () => {
  const history = useHistory();
  return (
    <div className="header-drop-down">
      <div
        className="header-drop-down-item"
        onClick={() => history.push("/setting")}
      >
        <div className="header-drop-down-item-icon">
          <span class="material-icons">settings</span>
        </div>
        <div className="header-drop-down-item-label">Setting</div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
