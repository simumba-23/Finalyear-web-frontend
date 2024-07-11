import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Form, Card, Container, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import '../App.css';
import styles from '../Assets/styles.module.css';

function Requestscheduling() {
  const { user, authTokens } = useContext(AuthContext);
  const accessTokens = authTokens.access;
  const location = useLocation();
  const tooldetail = location.state?.tooldetail;
  const [returnDate, setReturnDate] = useState('');
  const [lendDate, setLendDate] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [days, setDays] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const pricePerDay = tooldetail.price; // Example price per day
  // const toolId = tooldetail.id

  useEffect(() => {
    if (lendDate && returnDate) {
      calculateEndDate();
    }
  }, [lendDate, returnDate]);

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleLendDateChange = (event) => {
    setLendDate(event.target.value);
  };

  const calculateEndDate = () => {
    const start = new Date(lendDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days >= 0) {
      const totalCost = days * pricePerDay;
      setTotalCost(totalCost);
      setDays(days);
    } else {
      setTotalCost('');
      setDays('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    if (!lendDate || !returnDate || !days) {
      setError('Please fill in all fields correctly.');
      return;
    }

    const requestData = {
      tool: tooldetail.id,
      start_date: lendDate,
      end_date: returnDate,
      user: user.id,
      // duration: days,
    };

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/make_request/${tooldetail.id}/`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessTokens}`,
        },
      });
      console.log('Request Successful:', response.data);
      setLendDate('');
      setReturnDate('');
      setTotalCost('');
      setDays('');
      setError('');
      setValidated(false);
    } catch (error) {
      console.error('Request Failed:', error);
      setError('Failed to submit request. Please try again.');
      console.error('Error:', error.message);
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={5} className='my-5'>
          {error && (
            <Alert variant='danger' onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <Card className={`p-3 shadow-sm ${styles.customCard}`}>
            <Card.Header className='text-center'>Schedule your Request</Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId='formLendDate'>
                  <Form.Label>Lend Date</Form.Label>
                  <Form.Control
                    type='date'
                    value={lendDate}
                    onChange={handleLendDateChange}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please choose a lend date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formReturnDate' className='mt-3'>
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type='date'
                    value={returnDate}
                    onChange={handleReturnDateChange}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please choose a return date.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className='d-flex justify-content-between align-items-center mt-3'>
                  {totalCost && (
                    <p className='mb-0'>Total Cost: Tzs {totalCost} /=</p>
                  )}
                  {days && (
                    <p className='mb-0'>Days: {days}</p>
                  )}
                </div>
                <Form.Group className='d-flex justify-content-center mt-4'>
                  <Button type='submit' variant='primary'>
                    Submit Request
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Requestscheduling;
