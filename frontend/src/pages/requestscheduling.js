import React, { useState,useContext } from 'react';
import { Row, Col, Form, Card, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';


function Requestscheduling() {
    const {user,authTokens} = useContext(AuthContext);
    const accessTokens = authTokens.access

    const location = useLocation();
    const tooldetail = location.state?.tooldetail;
    const [returnDate, setReturnDate] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [days, setDays] = useState('');
    const [error, setError] = useState('');
    const pricePerDay = tooldetail.price; // Example price per day

    // Function to handle changes in the return date input
    const handleReturnDateChange = (event) => {
        setReturnDate(event.target.value);
    };

    // Function to calculate the end date based on the return date and calculate the total cost
    const calculateEndDate = () => {
        const today = new Date();
        const startDate = today.toISOString().substr(0, 10); // Get today's date in 'YYYY-MM-DD' format
        const endDate = returnDate; // Use the selected return date as the end date

        // Calculate the number of days between the start and end dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calculate the total cost by multiplying the number of days with the price per day
        const totalCost = days * pricePerDay;
        setTotalCost(totalCost);
        setDays(days);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        const today = new Date();
        const startDate = today.toISOString().substr(0, 10); // Get today's date in 'YYYY-MM-DD' format
        const endDate = returnDate; // Use the selected return date as the end date

        const requestData = {
            tool: tooldetail.id,
            start_date: startDate,
            end_date: endDate,
            user:user.id,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/requests/', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessTokens}`,

                },
            });
            console.log('Request Successful:', response.data);
            alert('Request submitted successfully!');
        } catch (error) {
            console.error('Request Failed:', error);
            setError('Failed to submit request. Please try again.');
        }
    };

    return (
        <div>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={12} md={6} lg={5} className='my-5'>
                        {error && (
                            <p style={{ color: 'red',padding:'10px' }}>{error}</p>
                        )}
                        <div style={{display:'flex',flexDirection:'row',backgroundColor:'lightblue',justifyContent:'space-around'}}>

                        {totalCost && (
                            <p>Total Cost: Tzs {totalCost} /=</p>
                        )}
                        {days && (
                            <p>Days: {days}</p>
                        )}
                        </div>

                        <Card className='p-5'>
                            <Card.Header className='text-center'>Schedule your Request</Card.Header>
                            
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Return Date</Form.Label>
                                        <Form.Control type='date' onChange={handleReturnDateChange} required />
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Button type='button' className='bg-secondary m-2' onClick={calculateEndDate}>
                                            Calculate Cost
                                        </Button>
                                        <Button type='submit' className='bg-primary'>
                                            Submit Request
                                        </Button>
                                    
                                    </Form.Group>
                                    
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Requestscheduling;
