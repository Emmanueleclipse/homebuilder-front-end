import React from "react";
import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";
import "./billing.styles.scss";
import { path } from "express/lib/application";

const Billing = () => {
  return (
    <div className="billing-page">
      <div className="billing-page-container">
        <div className="billing-page-heading">
          <h2>Purchase Credit</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam</p>
        </div>
        <div className="plans-container">

          <div className="plan-card">
            <div className="plan-title">Monthly Pass</div>
            <div className="plan-info">
              <div className="plan-info-title">What You'll Get</div>
              <div className="plan-info-details">
                <div className="plan-info-item">
                  <span class="material-icons">task_alt</span>
                  <p> Lorem ipsum dolor, sit amet consectetur adipisicing</p>
                </div>
                <div className="plan-info-item">
                  <span class="material-icons">task_alt</span>
                  <p> Lorem ipsum dolor, sit amet consectetur adipisicing</p>
                </div>
              </div>
              <div className="plan-price-container">
                <span className="plan-price">$65</span>
                <span className="plan-date">/month</span>
              </div>
              <div className="plan-btn-container">
                <Link to="/payment/month" >
                  <Button type="main">Choose</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="plan-card">
            <div className="plan-title">Yearly Pass</div>
            <div className="plan-info">
              <div className="plan-info-title">What You'll Get</div>
              <div className="plan-info-details">
                <div className="plan-info-item">
                  <span class="material-icons">task_alt</span>
                  <p> Lorem ipsum dolor, sit amet consectetur adipisicing</p>
                </div>
                <div className="plan-info-item">
                  <span class="material-icons">task_alt</span>
                  <p> Lorem ipsum dolor, sit amet consectetur adipisicing</p>
                </div>
              </div>
              <div className="plan-price-container">
                <span className="plan-price">$49</span>
                <span className="plan-date">/month</span>
              </div>
              <div className="plan-btn-container">
                <Link to="/payment/year" >
                  <Button type="main">Choose</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
