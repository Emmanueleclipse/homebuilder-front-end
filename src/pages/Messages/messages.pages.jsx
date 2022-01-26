import React, { useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import Person2 from "../../assets/images/person2.jpg";

import { NavLink } from "react-router-dom";
import "./messages.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../redux/actions/messageActions";

const Messages = ({ history }) => {
  const dispatch = useDispatch();
  const { token, error, loading } = useSelector((state) => state.authReducer);
  const {
    messages,
    error: errorMessage,
    loading: messagesLoading,
  } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    dispatch(fetchMessages({ token: token }));
  }, [dispatch]);
  const [page, setPage] = useState(1);
  const skip = (page - 1) * 4;
  const pages = Math.ceil(messages.length / 4);
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Messages</h2>
      </div>
      <div className="messages-container">
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
      </div>
    </div>
  );
};

export default Messages;
