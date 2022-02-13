import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchActivities } from "../../../redux/actions/activityAction";

import {
    fetchMessages,
    createMessage,
  } from "../../../redux/actions/messageActions";
  import axios from "../../../axios";
  import { connect } from "react-redux";


const shortid = require("shortid");

const MessageRoom = (props) => {
    const { messages } = useSelector((state) => state.messageReducer);
    var msgRef = useRef(null);
    const { user } = useSelector((state) => state.authReducer);
    const { id } = useParams();
    const [message, setMessage] = React.useState("");
    const [property, setProperty] = React.useState({});
    const dispatch = useDispatch();


    const sendMsg = (event) => {
        event.preventDefault();
        let newMsg = {};
    
        if (msgRef) {
          msgRef.current.addEventListener("DOMNodeInserted", (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" });
          });
        }
        if (user.role === "HOMEBUILDER") {
          newMsg = {
            id: shortid.generate(),
            send_by: user.email,
            send_to: property.homeowner,
            subject: "subject",
            property: id,
            message: message,
          };
          messages.push(newMsg);
        } else if (user.role === "HOMEOWNER") {
          newMsg = {
            id: shortid.generate(),
            send_by: user.email,
            send_to: property.homebuilder,
            subject: "subject",
            property: id,
            message: message,
          };
          messages.push(newMsg);
        }
    
        dispatch(createMessage({ message: newMsg, token: props.token }));
    
        setMessage("");
    
        event.target.value = "";
        console.log(msgRef.current.scrollHeight);
      };

      useEffect(() => {
        if (props.token) {
          axios
            .get("api/property/" + id, {
              headers: { Authorization: `Bearer ${props.token}` },
            })
            .then((res) => {
              setProperty(res.data);
            })
            .catch((err) => {});
        }
    
        if (msgRef) {
          /* msgRef.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });*/
        }
    
        dispatch(fetchMessages({ token: props.token, id: parseInt(id) }));
      }, [dispatch]);
  

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h5>kkiki</h5>
      </div>
      <div className="chat-box" ref={msgRef}>
        {messages !== undefined &&
          messages.map((msg) => (
            <>
              {msg.send_by === user.email && (
                <div key={msg.id} style={{color:'white'}} className="msg-to">
                  <p>{msg.message}</p>
                </div>
              )}
              {msg.send_by !== user.email && (
                <div className="msg-from" key={msg.id}>
                  <p>{msg.message}</p>
                </div>
              )}
            </>
          ))}
      </div>

      <div className="chat-footer">
        <form action="" onSubmit={(event) => sendMsg(event)}>
          <input
            type="text"
            placeholder="Say something nice"
            autofocus
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
            value={message}
          />
          <button className="send-btn" disabled={message.length===0?true:false}><span class="material-icons">send</span></button>
        </form>
      </div>
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
  export default connect(mapStateToProps, mapDispatchToProps)(MessageRoom);
  
