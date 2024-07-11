import React, { useState, useContext } from 'react';
import { Form, InputGroup, Image, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import user from '../Assets/user.png';
import password from '../Assets/password.png';
// import loginlogo from '../Assets/loginlogo.png';
import simumba from '../Assets/toolsharingsimumba.png';
import AuthContext from '../context/AuthContext';

function LoginPage() {
    const { loginUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await loginUser(e);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

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
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <Image src={user} alt="User Icon" height="20px" width="20px" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Enter Username"
                                            aria-label="Username"
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <div className="d-flex justify-content-between">
                                        <Form.Label>Password</Form.Label>
                                        <Link to="/Register" className="text-dark text-decoration-none">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <Image src={password} alt="Password Icon" height="20px" width="20px" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            aria-label="Password"
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                {error && <p className="text-danger mt-2">{error}</p>}
                                <p className="mt-3">
                                    Don't have an account? <Link to="/Register" className="text-dark text-decoration-none">Register</Link>
                                </p>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
