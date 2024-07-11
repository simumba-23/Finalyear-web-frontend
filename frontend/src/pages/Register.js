import React, { useState } from 'react';
import { Button, Card, Form, FormControl, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import loginlogo from '../Assets/loginlogo.png';
import simumba from '../Assets/toolsharingsimumba.png';
import axios from 'axios';

function RegisterForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        sex: '',
        lipa_number: '',
        account_number: '',
        phone_number: '',
        image: null,
    });
    
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.password === formData.confirm_password) {
            setLoading(true);
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            try {
                await axios.post('http://127.0.0.1:8000/api/register', formDataToSend, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                });
                alert('User created successfully');
                setFormData({
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    sex: '',
                    lipa_number: '',
                    account_number: '',
                    phone_number: '',
                    image: null,
                });
            } catch (error) {
                alert('Error during registration');
                console.error('Error:', error.message);
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Passwords do not match. Please try again.');
        }
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="text-center bg-info text-white">
                            <Image src={simumba} width="100%" height="250px" className="mb-3" />
                            DIGITAL PLATFORM FOR SHARING TOOLS
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="FirstName">
                                            <Form.Label>First Name:</Form.Label>
                                            <FormControl 
                                                name="first_name"
                                                placeholder="First Name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                autoComplete="firstName"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="LastName">
                                            <Form.Label>Last Name:</Form.Label>
                                            <FormControl 
                                                name="last_name"
                                                placeholder="Last Name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="Username">
                                    <Form.Label>Username:</Form.Label>
                                    <FormControl 
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Email">
                                    <Form.Label>Email Address:</Form.Label>
                                    <FormControl 
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="Password">
                                            <Form.Label>Password:</Form.Label>
                                            <FormControl 
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="password"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="ConfirmPassword">
                                            <Form.Label>Confirm Password:</Form.Label>
                                            <FormControl 
                                                type="password"
                                                name="confirm_password"
                                                placeholder="Confirm Password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="LipaNumber">
                                            <Form.Label>Lipa Number:</Form.Label>
                                            <FormControl 
                                                name="lipa_number"
                                                placeholder="Lipa Number"
                                                value={formData.lipa_number}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="AccountNumber">
                                            <Form.Label>Account Number:</Form.Label>
                                            <FormControl 
                                                name="account_number"
                                                placeholder="Account Number"
                                                value={formData.account_number}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="PhoneNumber">
                                    <Form.Label>Phone Number:</Form.Label>
                                    <FormControl 
                                        name="phone_number"
                                        placeholder="Phone Number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Sex">
                                    <Form.Label>Sex:</Form.Label>
                                    <FormControl 
                                        name="sex"
                                        placeholder="Sex"
                                        value={formData.sex}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Image">
                                    <Form.Label>Image:</Form.Label>
                                    <FormControl 
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3 w-100" disabled={loading}>
                                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Register'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;
