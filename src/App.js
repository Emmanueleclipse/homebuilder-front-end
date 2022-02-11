import "./App.css";
import { Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing/landing.page";
import Login from "./pages/Login/login.page";
import Dashboard from "./pages/Dashboard/dashboard.component";
import Register from "./pages/Signup/signup.page";
import Invite from "./pages/Invite/invite.component";
import Billing from "./pages/Billing/billing.page";
import Payment from "./pages/Payment/payment.page";
import notification from"./pages/notification/notification.pages"
import { connect } from "react-redux";
import { authCheckState } from "./redux/actions/authAction";
import { withRouter, Redirect } from 'react-router-dom';
import { Component } from "react";
import Setting from "./pages/Setting/setting.component";
import Crew from "./pages/crew/crew.component";
import Messages from "./pages/Messages/messages.pages";
import Activity from "./pages/Activity/activity.page";
import AddMessage from "./pages/AddMessage/add-message.component";
import Home from "./pages/Home/home.page";
import CreateProperty from "./pages/CreateProperty/create-property.component";
import Property from "./pages/Properties/Properties.page";
import MobileExpand from "./components/mobile-expand-bar/mobile-expand-bar";
import PaymentCancel from "./pages/PaymentCancel/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import ResetPassword from "./pages/ResetPassword/reset-password.component";
import milestonePage from "./pages/Milestones/milestone.page";
import Details from "./pages/ActivityDetails/Details";

class App extends Component {

    state = {}

    componentDidMount() {
        this.props.onTryAutoLogin();

    }



    render() {
        let routes = (
            <Switch>
                <Route exact path="/welcome" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Redirect to='/welcome' />

            </Switch>

        );
        console.log(this.props.isAuthenticated)
        if (this.props.isAuthenticated) {

            routes = (
                <Switch>
                    <Route exact path="/billing" component={Billing} />
                    <Route exact path="/invite" component={Invite} />
                    <Route exact path="/payment/:method" component={Payment} />
                    <Route exact path="/reset-password" component={ResetPassword} />

                    <Dashboard>

                        <Route exact path='/' component={Home} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path="/setting" component={Setting} />
                        <Route exact path="/crew" component={Crew} />
                        <Route exact path="/messages/:id" component={Messages} />
                        <Route path="/activity" component={Activity} />
                        
                        <Route path='/property-activities/:property_id' component={Home} />
                        <Route exact path="/messages/add" component={AddMessage} />
                        <Route exact path="/property" component={Property} />
                        <Route exact path="/property/add" component={CreateProperty} />
                        <Route exact path="/more" component={MobileExpand} />
                        <Route exact path="/notification" component={notification}/>
                        <Route exact path='/payment-success' component={PaymentSuccess} />
                        <Route exact path='/payment-cancel' component={PaymentCancel} />
                        <Route exact path="/milestones/:id" component={milestonePage} />
                        <Route exact path="/milestoneDetails/:property_id/:activity_id" component={Details} />


                        <Redirect to='/' />
                    </Dashboard>

                </Switch>

            );
        }
        return (
            <>
                {routes}

            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token != null
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onTryAutoLogin: () => dispatch(authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));