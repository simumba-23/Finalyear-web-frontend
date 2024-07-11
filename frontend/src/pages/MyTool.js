import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Nav, Spinner, Alert } from 'react-bootstrap';
import { Star } from 'react-bootstrap-icons';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ToolActions from './ToolActions';
import styles from '../Assets/styles.module.css';
import '../App.css';

function MyTool() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, authTokens } = useContext(AuthContext);
    const accessTokens = authTokens.access;
    const BASE_URL = 'http://127.0.0.1:8000/';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/get_tool_owner", {
                    headers: {
                        'Authorization': `Bearer ${accessTokens}`,
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [accessTokens]);

    const handleUpdate = (updatedTool) => {
        setData(data.map(tool => (tool.id === updatedTool.id ? updatedTool : tool)));
    };

    const handleDelete = (id) => {
        setData(data.filter(tool => tool.id !== id));
    };

    if (loading) {
        return (
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Spinner animation='border' />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <Alert variant='danger'>
                    {error.message}
                </Alert>
            </Container>
        );
    }

    return (
        <>
            {user && (
                <Container>
                    <Nav className="my-3">
                        <Nav.Item>
                            <Nav.Link as="div">My Tools</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Row>
                        {data.map((item) => (
                            <Col xs={12} md={6} lg={4} key={item.id}>
                                <Card className='my-3 custom-card-shadow'>
                                    <Card.Img
                                        variant='top'
                                        src={`${BASE_URL}${item.image}`}
                                        alt={item.name}
                                        style={{ width: '100%', height: '150px' }}
                                    />
                                    <Card.Body className={styles.cardBody}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <hr />
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <Card.Text className='text-muted'>TZS {item.price}/=</Card.Text>
                                            <div className='d-flex align-items-center'>
                                                <Star className='me-1' color='gold' />
                                                <Card.Text>{!item.avarage_rating? 0 : item.avarage_rating}</Card.Text>
                                            </div>
                                            <Card.Text
                                                className={`status-badge ${item.status.toLowerCase()}`}
                                            >
                                                {item.status}
                                            </Card.Text>
                                        </div>
                                        <ToolActions item={item} onDelete={handleDelete} onUpdate={handleUpdate} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </>
    );
}

export default MyTool;
