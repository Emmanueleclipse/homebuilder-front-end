import React, {useRef, useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import Person2 from "../../assets/images/person2.jpg";
import { fetchActivities } from "../../redux/actions/activityAction";
import { connect } from "react-redux";
import { NavLink , useParams} from "react-router-dom";
import "./messages.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../redux/actions/messageActions";
import axios from "../../axios";

const shortid = require('shortid');

const Messages = (props) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [property, setProperty] = React.useState({});
  var msgRef = useRef(null);
  const [shouldScroll, setShouldScroll] = React.useState(false)
  const { token, error, loading } = useSelector((state) => state.authReducer);
  const { user } = useSelector((state) => state.authReducer);
  const { id } = useParams();

 
  const sendMsg = (event) => {
    console.log(user)
    event.preventDefault();
    setShouldScroll(msgRef.current.scrollTop + msgRef.current.clientHeight === msgRef.current.scrollHeight);

    let senders = ["me", "other"];
    let from = senders[Math.floor(Math.random() * 2 + 0)];
    if(user.role==='HOMEBUILDER'){
      let newMsg = {
        id: shortid.generate(),
        author: user.pk,
        receiver:property.homeowner,
        text: message,
        roomId:id
      };
      messages.push(newMsg);

    }else{
      let newMsg = {
        id: shortid.generate(),
        author: user.pk,
        receiver:property.homebuilder,
        text: message,
        roomId:id
      };
      messages.push(newMsg);

    }

    
    setMessages(messages);
    
    setMessage('');
    msgRef.current.scrollTop = msgRef.current.scrollHeight+2000;

    event.target.value = "";
    console.log(msgRef.current.scrollHeight);
  };

  const needScroll=()=>{
    if (!shouldScroll) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;

    }
  }

  useEffect(() => {
    if (props.token) {
      axios
        .get("api/property/" + id, {
          headers: { Authorization: `Bearer ${props.token}` },
        })
        .then((res) => {
          setProperty(res.data)
        }).catch((err)=>{})


    }
  
    dispatch(fetchMessages({ token: token }));
  }, [dispatch, message]);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 4;
  const pages = Math.ceil(messages.length / 4);
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Messages - {property.name}</h2>
      </div>
      <div className="chat-room">
        <div className="chat-header">
          <h5>kkiki</h5>
        </div>
        <div className="chat-box" ref={msgRef}>
         
        {messages !== undefined &&
            messages.map((msg) => (
              <>
              
                {msg.from === "me" && <div  className="msg-to"><p>{msg.text}</p></div>}
                {msg.from !== "me" && (
                  <div className="msg-from"><p>{msg.text}</p></div>
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
            <button className="send-btn">sent</button>
          </form>
        </div>
      </div>
      {/*<div className="messages-container">
        <div className="messages-header">
          <NavLink to="/messages/add">
            <Button type="main">Add Message</Button>
          </NavLink>
        </div>
        <div className="messages-list">
          {messages
            .filter((el, idx) => idx >= skip && idx < skip + 4)
            .map((message) => (
              <div className="message-card">
                <div className="message-card-left">
                  <div className="message-sender">
                    <div className="message-sender-img">
                      <img src={Person2} alt="" />
                    </div>
                    <div className="message-sender-info">
                      <div className="message-sender-info-name">M.LAFLEUR</div>
                      <div className="message-sender-info-date">
                        1ST - 14:33
                      </div>
                    </div>
                  </div>
                  <div className="message-content">{message.subject}</div>
                </div>
                <div className="message-card-right">
                  <a href="/" className="btn-link">
                    more...
                  </a>
                </div>
              </div>
            ))}
          <div className="pagination-container">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <div
                    onClick={() =>
                      setPage((prev) => (prev !== 1 ? prev - 1 : prev))
                    }
                    class="page-link"
                    href="/"
                  >
                    <span class="material-icons">chevron_left</span>
                  </div>
                </li>
                {Array(pages)
                  .fill(1)
                  .map((el, idx) => (
                    <li
                      class={`page-item ${idx + 1 === page ? "active" : ""}`}
                      onClick={() => setPage(idx + 1)}
                    >
                      <div class="page-link">{idx + 1}</div>
                    </li>
                  ))}
                <li class="page-item">
                  <div
                    onClick={() =>
                      setPage((prev) => (prev !== pages ? prev + 1 : prev))
                    }
                    class="page-link"
                    href="/"
                  >
                    <span class="material-icons">chevron_right</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    'token': state.authReducer.token,
    'activities': state.activityReducer.activities,
    'activityError': state.activityReducer.error,
    'activityLoading': state.activityReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    'fetchAllActivities': (token, property_id) => dispatch(fetchActivities({ token, property_id }))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
