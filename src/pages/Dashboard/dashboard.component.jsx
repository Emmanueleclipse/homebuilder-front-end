import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import Home from "../Home/home.page";
import Header from "../../components/header/header.component";
import SideBar from "../../components/side-bar/side-bar.component";
import Activity from "../Activity/activity.page";
import "./dashboard.styles.scss";
import Messages from "../Messages/messages.pages";
import AddMessage from "../AddMessage/add-message.component";
import ResetPassword from "../ResetPassword/reset-password.component";
import Crew from "../crew/crew.component";
import Setting from "../Setting/setting.component";
import MobileBar from "../../components/mobile-bar/mobile-bar.component";
import MobileExpand from "../../components/mobile-expand-bar/mobile-expand-bar";
import MobileBackBtn from "../../components/mobile-back-btn/mobile-back-btn.component";
import CreateProperty from "../CreateProperty/create-property.component";
import PaymentCancel from "../PaymentCancel/PaymentCancel";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";
import Property from "../Properties/Properties.page";
const Dashboard = (props) => {
  return (
    <div className="dashboard-container">
      <Header />
      <SideBar />
      <MobileBar />
      <MobileBackBtn />
      <div className="dashboard">
        {props.children}
      </div>
    </div>
  );
};

export default Dashboard;
