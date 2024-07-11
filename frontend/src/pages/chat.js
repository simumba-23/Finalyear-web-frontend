import React, { useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Card, Container, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import '../App.css';

function Chat() {
  const [messages, setMessages] = useState({ received: [], sent: [] });
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, authTokens } = useContext(AuthContext);
  const accessTokens = authTokens.access;
  const location = useLocation();
  const tooldetail = location.state?.tooldetail;
  const ownerUser = tooldetail?.owner_id;

  useEffect(() => {
    console.log("Component mounted or user changed");
    Pusher.logToConsole = true;

    fetchMessages();

    const pusher = new Pusher('5f4a20ec3ccfcf341f8b', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('chat_' + user.username); // Updated to dynamic channel
    channel.bind('new_message', function (data) { // Ensure the event name matches
      if (data.sender === user.username) {
        setMessages(prevMessages => ({
          ...prevMessages,
          sent: [...prevMessages.sent, data]
        }));
      } else if (data.receiver === user.username) {
        setMessages(prevMessages => ({
          ...prevMessages,
          received: [...prevMessages.received, data]
        }));
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [user.username]);

  const fetchMessages = async () => {
    try {
      console.log("Fetching messages...");
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/messages/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessTokens}`,
        },
      });
      const allMessages = response.data;
      const received = allMessages.filter(message => message.receiver === user.username);
      const sent = allMessages.filter(message => message.sender === user.username);
      setMessages({ received, sent });
      setLoading(false);
      console.log("Messages fetched successfully");
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      console.log("Sending message...");
      await axios.post('http://127.0.0.1:8000/api/messages/', {
        receiver: ownerUser,
        content: newMessage,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessTokens}`,
        },
      });
      setNewMessage('');
      console.log("Message sent successfully");
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <Container className='my-5'>
      <Card className="chat-container p-3 shadow-sm">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div className="messages mb-3">
              {/* <h5 className='mb-3'>Received Messages</h5> */}
              {messages.received.map((message) => (
                <div key={message.created_at} className="message received-message mb-3">
                  <div className="message-content">
                    <strong>{message.sender}</strong>
                    <p>{message.content}</p>
                    <small>{new Date(message.created_at).toLocaleString()}</small>
                  </div>
                </div>
              ))}
              {/* <h5 className='mt-4 mb-3'>Sent Messages</h5> */}
              {messages.sent.map((message) => (
                <div key={message.created_at} className="message sent-message mb-3">
                  <div className="message-content">
                    <strong>{message.receiver}</strong>
                    <p>{message.content}</p>
                    <small>{new Date(message.created_at).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className='mt-3'>
              <InputGroup>
                <Form.Control
                  placeholder='Write a message'
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <Button type='submit' variant='primary'>Send</Button>
              </InputGroup>
            </form>
          </>
        )}
      </Card>
    </Container>
  );
}

export default Chat;
