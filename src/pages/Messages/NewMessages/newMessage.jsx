import { fetchActivities } from "../../../redux/actions/activityAction";
import { connect } from "react-redux";
import "../messages.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import React, {useRef, useEffect, useState } from "react";
import { NavLink , useParams} from "react-router-dom";
import { fetchMessages, createMessage } from "../../../redux/actions/messageActions";
import { ToastContainer, toast } from "react-toastify";


const NewMessage=(props)=>{
    const { user } = useSelector((state) => state.authReducer);
    const [sent_to,setSent_to] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [file, setFile] = useState({})

    const { id } = useParams();
    const dispatch = useDispatch();

    const sendMsg = (event) => {

  
        event.preventDefault();
        let newMsg={}
      
        
       
          newMsg = {
            
            send_by: user.email,
            send_to:sent_to,
            subject: subject,
            property:id,
            message:message
          };
         // messages.push(newMsg);
    
        
    
        console.log(newMsg)
      
        dispatch(createMessage({message:newMsg, token: props.token }));
    
        setMessage('');
    
        event.target.value = "";
        
      };




    return(
        <div className="principal-container">
            <h1>New Message</h1>
            <br /><br /><br />
            <div className="newMessage_container">
            <form action="#" onSubmit={(e)=>sendMsg(e)}>
                <label htmlFor="">Send to</label>
                
                <input type="text" className='btnForm' onChange={(event=>setSent_to(event.target.value))} />
                <br />
                <label htmlFor="" >Subject</label>
            
                <input type="text" onChange={(event=>setSubject(event.target.value))} className='btnForm' />
                <br />
                <label htmlFor="">Message</label>
                <textarea name="" onChange={(event)=>setMessage(event.target.value)}  id="" cols="30" rows="10"></textarea>
                
                <br />
                <input type="file" name="" id="" onChange={event=>setFile(event.target.value)} />
                <br />
                <input className='send' type="submit" value="Send" />
            </form>
        </div>
        <ToastContainer />

        </div>
    )
}


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
  export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
  