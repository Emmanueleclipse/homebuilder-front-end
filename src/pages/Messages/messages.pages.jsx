import React, { useRef, useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import Person2 from "../../assets/images/person2.jpg";
import { fetchActivities } from "../../redux/actions/activityAction";
import { connect } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./messages.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  createMessage,
} from "../../redux/actions/messageActions";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const shortid = require("shortid");

const Messages = (props) => {
  const dispatch = useDispatch();
  //const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [property, setProperty] = React.useState({});
  var msgRef = useRef(null);
  const [shouldScroll, setShouldScroll] = React.useState(false);
  const { token, error, loading } = useSelector((state) => state.authReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const history = useHistory();

  const { user } = useSelector((state) => state.authReducer);
  const { id } = useParams();

  

  const needScroll = () => {
    if (!shouldScroll) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  };

  const toRoom=()=>{
    history.push("/message_room/"+id);

  }

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

    dispatch(fetchMessages({ token: token, id: parseInt(id) }));
  }, [dispatch]);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 4;
  const pages = Math.ceil(messages.length / 4);
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Messages - {property.name}</h2>
      </div>
      <div className="inbox__container">
        <div className="inbox__head">
          <p>Messages</p>

          <Link className="btn-green-color" to={"/new_message/" + id}>
            <a href="">Compose</a>
          </Link>
        </div>
        <div className="inbox__messages">
          <table>
            <tr className="inbox__table_header">
              <th>Time</th>
              <th>From</th>
              <th>Subject</th>
            </tr>
            <br />
            {messages.map((msg, i) => {
              return(
                <tr className="inbox__table_body" onClick={()=>toRoom()}>
                <td>
                  <span>{msg.created_at}</span>
                </td>
                <td>{msg.send_to}</td>
                <td>{msg.subject}</td>
              </tr>
              )
            })}
          </table>
        </div>
      </div>

      {/*<div className="chat-room">
        <div className="chat-header">
          <h5>kkiki</h5>
        </div>
        <div className="chat-box" ref={msgRef}>
         
        {messages !== undefined &&
            messages.map((msg) => (
              <>
              
                { msg.send_by === user.email && <div key={msg.id} className="msg-to"><p>{msg.message}</p></div>}
                {(msg.send_by !== user.email)  && (
                  <div className="msg-from" key={msg.id}><p>{msg.message}</p></div>
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
                </div>*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
