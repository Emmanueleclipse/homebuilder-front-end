import React from "react";
import { Link } from "react-router-dom";
import "./mobile-expand-bar.styles.scss";
const MobileExpand = () => {
  return (
    <div className="for-mobile mobile-expand-bar">
      <div className="mobile-expand-heading">More Actions</div>
      <div className="mobile-expand-list">
        <Link to="/">
          <div className="mobile-expand-item">
            <div className="mobile-expand-item-left">
              <div className="mobile-expand-item-icon">
                <span class="material-icons">home</span>
              </div>
              <div className="mobile-expand-item-label">Home</div>
            </div>
            <div className="mobile-expand-item-right">
              <span class="material-icons">chevron_right</span>
            </div>
          </div>
        </Link>
        <div className="mobile-expand-item">
          <div className="mobile-expand-item-left">
            <div className="mobile-expand-item-icon">
              <span class="material-icons">description</span>
            </div>
            <div className="mobile-expand-item-label">Documents</div>
          </div>
          <div className="mobile-expand-item-right">
            <span class="material-icons">chevron_right</span>
          </div>
        </div>
        <div className="mobile-expand-item">
          <div className="mobile-expand-item-left">
            <div className="mobile-expand-item-icon">
              <span class="material-icons">query_stats</span>
            </div>
            <div className="mobile-expand-item-label">Reports</div>
          </div>
          <div className="mobile-expand-item-right">
            <span class="material-icons">chevron_right</span>
          </div>
        </div>
        <div className="mobile-expand-item">
          <div className="mobile-expand-item-left">
            <div className="mobile-expand-item-icon">
              <span class="material-icons">assignment</span>
            </div>
            <div className="mobile-expand-item-label">Building Phases</div>
          </div>
          <div className="mobile-expand-item-right">
            <span class="material-icons">chevron_right</span>
          </div>
        </div>
        <div className="mobile-expand-item">
          <div className="mobile-expand-item-left">
            <div className="mobile-expand-item-icon">
              <span class="material-icons">save_alt</span>
            </div>
            <div className="mobile-expand-item-label">Resources</div>
          </div>
          <div className="mobile-expand-item-right">
            <span class="material-icons">chevron_right</span>
          </div>
        </div>
        <div className="mobile-expand-item">
          <div className="mobile-expand-item-left">
            <div className="mobile-expand-item-icon">
              <span class="material-icons">logout</span>
            </div>
            <div className="mobile-expand-item-label">Logout</div>
          </div>
          <div className="mobile-expand-item-right">
            <span class="material-icons">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileExpand;
