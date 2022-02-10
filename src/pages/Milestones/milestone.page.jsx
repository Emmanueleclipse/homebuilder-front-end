import React, { useEffect } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import "./milestones.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../redux/actions/activityAction";
import { connect } from "react-redux";
import axios from "../../axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Messages from "../../components/messages/messages";


const Milestones = (props) => {
  const [feeds, setFeeds] = React.useState([]);
  const [filter, setFilter] = React.useState("today");
  const { id } = useParams();
  const [property, setProperty] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  let activities_arrr = [];
  function convertDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  function timeSetting(date) {
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    return new Date(date_string);
  }

  function handleMessage(event) {
    console.log(event.target.value);
    setMessage(event.target.value);
  }

  

  const toAccept = (item) => {
    

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      customClass:{
        confirmButton:'swal-btn-confirm swal2-my-btn',
        cancelButton:'swal2-cancel swal2-my-btn'
      },
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
      buttonsStyling:false,
      showCancelButton: true,
      confirmButtonColor: "#398d63",
      cancelButtonColor: "#FFFFFF      ",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("/api/activity/approve/" + item.activity_id, {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            toast.success(item.activity_name + " " + "sent to review", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            item.activity_status = "completed";
            setFeeds(
              feeds.map((i) => {
                if (i.activity_id === item.activity_id) {
                  i = item;
                  console.log(i);
                }
                return i;
              })
            );
            // item.activity_status='Awaiting feedback';
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.detail, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    });
  };

  const changes = (item) => {
    Swal.fire({
      customClass:{
        confirmButton:'swal-btn-confirm swal2-my-btn',
        cancelButton:'swal2-cancel swal2-my-btn'
      },
      showClass: {
        backdrop: 'swal2-noanimation', // disable backdrop animation
        popup: '',                     // disable popup animation
        icon: ''                       // disable icon animation
      },
      hideClass: {
        popup: '',                     // disable popup fade-out animation
      },
      buttonsStyling:false,
      title: "Are you sure?",
      text: "You won't be able to revert this!",
    
      showCancelButton: true,
     
      confirmButtonText: "Yes, Request changes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("/api/activity/decline/" + item.activity_id, {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            toast.warning(item.activity_name + " " + "request changes", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log(res);
            item.activity_status = "request changes";
            setFeeds(
              feeds.map((i) => {
                if (i.activity_id === item.activity_id) {
                  i = item;
                  console.log(i);
                }
                return i;
              })
            );
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.detail, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    });
  };

  const submit = (item) => {
   
   Swal.fire({
    customClass:{
      confirmButton:'swal-btn-confirm swal2-my-btn',
      cancelButton:'swal2-cancel swal2-my-btn'
    },
    showClass: {
      backdrop: 'swal2-noanimation', // disable backdrop animation
      popup: '',                     // disable popup animation
      icon: ''                       // disable icon animation
    },
    hideClass: {
      popup: '',                     // disable popup fade-out animation
    },
    buttonsStyling:false,

    title: "Are you sure?",
    text: "You won't be able to revert this!",
  
    showCancelButton: true,
    showConfirmButton:true,
   
    
    confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("/api/activity/submit/" + item.activity_id, {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => {
            toast.success(item.activity_name + " " + "was accepted", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            item.activity_status = "Awaiting feedback";
            setFeeds(
              feeds.map((i) => {
                if (i.activity_id === item.activity_id) {
                  i = item;
                  console.log(i);
                }
                return i;
              })
            );
            // item.activity_status='Awaiting feedback';
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.detail, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    });
  };

  useEffect(() => {
    //const property_id = this.router.params.id;
    //  ?props.history.push('/')
    console.log("l");
    if (props.token) {
      console.log(user);

      axios
        .get("api/property/" + id, {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then((res) => {
          console.log(res.data);
          setProperty(res.data);
          let property = res.data;

          let current_date = new Date();

          property.activities.map((item) => {
            activities_arrr.push({
              property_id: property.pk,
              property_name: property.name,
              address: property.address,
              activity_name: item.milestone_name,
              activity_status: item.status,
              date: item._to,
              created_at: item.created_at,
              //view_text: "Today",
              description: item.description,
              activity_id: item.pk,
            });

            return true;
          });

          /*for (let i = 0; i < properties.length; i++) {
          let activities = properties[i].activities;

          if (activities.length > 0) {

            for (let j = 0; j < activities.length; j++) {
              let from_date = new Date(activities[j]._from);
               
              const diffTime = Math.abs(timeSetting(from_date) - timeSetting(current_date));
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays > 0 && (from_date > current_date || convertDate(current_date) === convertDate(from_date))) {
                console.log(activities[j].milestone_name, diffDays)

                if (diffDays === 1 ) {
                  activities_arrr.push({
                    property_id: properties[i].pk,
                    property_name: properties[i].name,
                    address: properties[i].address,
                    activity_name: activities[j].milestone_name,
                    activity_status: activities[j].status,
                    date: activities[j]._from,
                    view_text: "Today",
                    description : activities[j].description,
                    activity_id : activities[j].pk
                  })
                }

                if (diffDays === 2) {
                  activities_arrr.push({
                    property_id: properties[i].pk,
                    property_name: properties[i].name,
                    address: properties[i].address,
                    activity_name: activities[j].milestone_name,
                    activity_status: activities[j].status,
                    date: activities[j]._from,
                    view_text: "Tomorrow",
                    description : activities[j].description,
                    activity_id : activities[j].pk
                  })
                }

                if (diffDays > 2) {
                  activities_arrr.push({
                    property_id: properties[i].pk,
                    property_name: properties[i].name,
                    address: properties[i].address,
                    activity_name: activities[j].milestone_name,
                    activity_status: activities[j].status,
                    date: activities[j]._from,
                    view_text: activities[j]._from,
                    description : activities[j].description,
                    activity_id : activities[j].pk
                  })
                }
              }
            }
          }
        }*/

          //sort for order from oldest to newest
          setFeeds(
            activities_arrr.sort((a, b) => {
              if (a.created_at > b.created_at) {
                return 1;
              } else if (a.created_at < b.created_at) {
                return -1;
              }
              return 0;
            })
          );

          console.log(feeds);
        })
        .catch((err) => console.log(err));
    }
  }, [props.token]);

  return (
    <div className="dashboard-page">
         

      <div className="dashboard-page-heading custom-heading">
      <Link to={"/messages/"+id} style={{backgroundColor:'none',color:'#398d63',border:'none',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <span class="material-icons">chat</span><p>Messages</p>
      
      </Link>
       
       
      </div>

      <div className="milestones-container custom-container">
        {feeds.length > 0 &&
          feeds.map((item, index) => (
            <div
              key={index}
              style={{ display: item === undefined ? "none" : "block" }}
              className="feed-main-card-div my-3 px-3 pt-3 pb-4"
            >
              {console.log(feeds)}
              <p className="text-center mb-3">{item.view_text}</p>
              <div className="d-sm-flex card-inner-details justify-content-between">
                <div>
                  <p className="fw-bold">
                    {index + 1}. {item.activity_name}
                  </p>
                  <div
                    id="status-container"
                    style={{
                      width:
                        item.activity_status === "change requested" ||
                        item.activity_status === "Awaiting feedback"
                          ? "auto"
                          : item.activity_status === "ongoing"
                          ? "80px"
                          : "100px",
                    }}
                  >
                    <p
                      className="mb-2"
                      style={{
                        color:
                          item.activity_status !== "change requested"
                            ? "green"
                            : "red",
                      }}
                    >
                      {(item.activity_status )}
                    </p>
                    <br />
                  </div>
                  <p>Due {item.date}</p>

                  {/* <p>20</p> */}
                </div>
                {/*}
                <button className="btn-delete" onClick={()=>deleteMilestone(item)}> 
                   delete
          </button>*/}
              </div>
              {user.role === "HOMEBUILDER" && (
                <div className="btns-div d-sm-flex mt-3">
                  {item.activity_status !== "Awaiting feedback" &&
                    item.activity_status !== "completed" && (
                      <button
                        className="btn-green-color"
                        href="#"
                        onClick={() => submit(item)}
                      >
                        Submit
                      </button>
                    )}
                  {item.activity_status === "Awaiting feedback" && (
                    <button className="btn-gray-color" href="#">
                      Submit
                    </button>
                  )}
                  {item.activity_status === "completed" && (
                    <button className="btn-gray-color" href="#">
                      Submit
                    </button>
                  )}
                </div>
              )}
              {user.role === "HOMEOWNER" &&
                item.activity_status !== "completed" && (
                  <div className="btns-div d-sm-flex mt-3">
                    <button
                      className="btn-light-color"
                      href="#"
                      onClick={() => toAccept(item)}
                      disabled={
                        item.activity_status === "completed" ? true : false
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn-green-color"
                      href="#"
                      onClick={() => changes(item)}
                      disabled={
                        item.activity_status === "completed" ? true : false
                      }
                    >
                      Request Change
                    </button>
                  </div>
                )}
            </div>
          ))}
      </div>

      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    activities: state.activityReducer.activities,
    activityError: state.activityReducer.error,
    activityLoading: state.activityReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllActivities: (token, property_id) =>
      dispatch(fetchActivities({ token, property_id })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Milestones);
