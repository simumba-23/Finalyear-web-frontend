import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Nav, Spinner, Alert } from 'react-bootstrap';
import { Star } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
// import styles from '../Assets/styles.module.css';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import '../App.css';

function HomePage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/get_tool");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const BASE_URL = 'http://127.0.0.1:8000/';

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (error) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <>
            {user ? (
                <>
                                <hr />
                    <Container>
                    
                        <Row>
                            {data.map((item) => (
                                <Col xs={12} md={6} lg={4} key={item.id}>
                                    <Link to={`/Tooldetail/${item.id}`}>
                                        <Card className="my-3 custom-card-shadow">
                                            <Card.Img
                                                variant="top"
                                                src={`${BASE_URL}${item.image}`}
                                                alt={item.name}
                                                style={{ width: '100%', height: '150px' }}
                                            />
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <hr />
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Card.Text className="text-muted">TZS {item.price}/=</Card.Text>
                                                    <div className="d-flex align-items-center">
                                                        <Star className="me-1" color="gold" />
                                                        <Card.Text>{!item.avarage_rating? 0 : item.avarage_rating}</Card.Text>
                                                    </div>
                                                    <Card.Text
                                                        className={`status-badge ${item.status.toLowerCase()}`}
                                                    >
                                                        {item.status}
                                                    </Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            ) : (
                <Alert variant="warning">Please log in to view the tools.</Alert>
            )}
        </>
    );
}

export default HomePage;
