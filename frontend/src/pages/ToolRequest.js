import React, { useState, useEffect,useContext } from 'react';
import { Container, Accordion, Spinner, Alert } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ToolRequest = () => {
  const { toolId } = useParams(); // Retrieve toolId from URL
  const [requests, setRequests] = useState([]);
  const { user, authTokens } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessTokens = authTokens.access;


  useEffect(() => {
    // if (!toolId) {
    //   setError('Tool ID is not provided');
    //   setLoading(false);
    //   return;
    // }

    const fetchRequests = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/requests/`,{
            headers:{
                'Authorization': `Bearer ${accessTokens}`,
            }
        });
        console.log('data:',response.data)
        if (Array.isArray(response.data)) {
        setRequests(response.data);
        } else {
        setError('Unexpected response format');
        }
        setLoading(false);
    } catch (error) {
        setError('Error fetching the tool requests');
        setLoading(false);
    }
    };

    fetchRequests();
    }, [toolId]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <p className='text-center'> List Of Tool Requests</p>
      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <Accordion.Item eventKey={index.toString()} key={request.id}>
              <Accordion.Header>Request #{index + 1}</Accordion.Header>
            <Accordion.Body>
                <p>{request.tool_name} requested by: {request.user_first_name} {request.user_last_name} from {request.start_date} to {request.end_date}  </p>
        
                <p>Status: {request.duration}</p>
            </Accordion.Body>
            </Accordion.Item>
        ))
        ) : (
          <p>No requests found.</p>
        )}
      </Accordion>
    </Container>
  );
};
