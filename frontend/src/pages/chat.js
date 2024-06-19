import React, { useContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
function Chat() {
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState('')
  const { user,authTokens } = useContext(AuthContext)
  const accessTokens = authTokens.access
  const location = useLocation()
  const tooldetail = location.state?.tooldetail  
  const ownerUser = tooldetail.owner_id 
  console.log('Owner Info:', ownerUser);

  useEffect(()=>{
  
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
  fetchMessages();


    var pusher = new Pusher('5f4a20ec3ccfcf341f8b', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      setMessages((prevMessages) => [...prevMessages, data]);

      alert(JSON.stringify(data));
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
  };
  },[])

  
  const fetchMessages = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/messages/',{
          headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessTokens}`,
    }

        });
        setMessages(response.data);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

  const handleSendMessage = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/messages/', {
            receiver: ownerUser,
            content: newMessage,
        },{
          headers:{
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${accessTokens}`,
          }
        });
        alert('data saved successfuly')
        console.log('received data:', Response.data)
        setNewMessage('');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

  return (
    <div className='container'>
      
      <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <div class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        {/* <input class="fs-5 fw-semibold" value={username} onChange={ e => setUsername(e.target.value)}/> */}
      </div>
    <div class="list-group list-group-flush border-bottom scrollarea" style={{minHeight:250}}>
      {messages.map(message=>{
          return(
            <div key={message.timestamp} class="list-group-item list-group-item-action py-3 lh-tight">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{message.username}</strong>
            </div>
            <div class="col-10 mb-1 small">{message.content}</div>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>

          )
          
      })}
      
    </div>
    </div>
    <form onSubmit={handleSendMessage}>
      <input className='form-control'
        placeholder='Write massages'
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}

      />
      <input type='submit' className='btn btn-primary' value='send'/>
    </form>
    </div>

  )
}

export default Chat 
