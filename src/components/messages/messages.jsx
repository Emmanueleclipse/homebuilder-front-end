import React, { useEffect } from "react";

import Popup from "reactjs-popup";
import { fetchActivities } from "../../redux/actions/activityAction";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";


const Messages = () => {
    const [messages, setMessages] = React.useState([]);

  return (
    <Popup trigger={<button style={{backgroundColor:'none',color:'#398d63',border:'none'}}><span class="material-icons">chat</span><p>Messages</p></button>} modal>
      <div className="chat-room">
        <div className="chat-header">
          <h5>kkiki</h5>
        </div>
        <div className="chat-box">
          {messages !== undefined &&
            messages.map((msg) => (
              <>
                {msg.from === "me" && <div className="msg-to">{msg.text}</div>}
                {msg.from !== "me" && (
                  <div className="msg-from">{msg.text}</div>
                )}
              </>
            ))}
        </div>

        <div className="chat-footer">
          <form action="" >
            <input
              type="text"
              value='l'
              placeholder="Say something nice"
              autofocus
             
              className="chat-input"
            />
            <button className="send-btn">sent</button>
          </form>
        </div>
      </div>
    </Popup>
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
  