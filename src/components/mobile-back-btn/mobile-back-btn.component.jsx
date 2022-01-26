import React from "react";
import { useHistory } from "react-router-dom";
import "./mobile-back-btn.styles.scss";

const MobileBackBtn = () => {
  const history = useHistory();
  return (
    <div className="for-mobile mobile-back-btn">
      <div className="back-btn" onClick={() => history.goBack()}>
        <span class="material-icons">arrow_back</span>
      </div>
    </div>
  );
};

export default MobileBackBtn;
