import { Offcanvas, Nav, Card, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'react-bootstrap-icons';

import '../App.css';

function CategoryOffcanvas() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [categories, setCategories] = useState([]);
    const [tools, setTools] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_category');
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const fetchToolData = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_tool_by_category/${id}`);
            setTools(response.data);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleCategory = (id) => {
        setSelectedCategory(id);
        fetchToolData(id);
    };

    const BASE_URL = 'http://127.0.0.1:8000/';
    const handleToolClick = (id) => {
        navigate(`/Tooldetail/${id}`);
        handleClose();
    };

    return (
        <div>
            <div variant="primary" onClick={handleShow} className="">
                ALL CATEGORIES
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="top" className="h-100 mt-5 mb-5">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>All Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col md={3}>
                            <Nav className="flex-column category-nav">
                                {categories.map((category) => (
                                    <Nav.Link
                                        key={category.id}
                                        onClick={() => handleCategory(category.id)}
                                        className="category-link"
                                    >
                                        {category.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </Col>
                        <Col md={9}>
                            {selectedCategory && (
                                <>
                                    {tools.length > 0 ? (
                                        <Row xs={1} md={2} lg={3} className="g-4 scroll-offcanvas">
                                            {tools.map((item) => (
                                                <Col key={item.id}>
                                                    <Card
                                                        className="display my-3 custom-card-shadow tool-card"
                                                        onClick={() => handleToolClick(item.id)}
                                                    >
                                                        <Card.Img
                                                            style={{ width: '100%', height: '200px' }}
                                                            variant="top"
                                                            src={`${BASE_URL}${item.image}`}
                                                            alt={item.name}
                                                        />
                                                        <Card.Body>
                                                            <Card.Title className="tool-name">{item.name}</Card.Title>
                                                            <hr />
                                                            <div className="d-flex justify-content-between">
                                                                <Card.Text className="tool-price">TZS {item.price}/=</Card.Text>
                                                                <Card.Text className="tool-rating">
                                                                    <Star className="me-1" color="gold" />
                                                                    {!item.avarage_rating? 0 : item.avarage_rating}
                                                                </Card.Text>
                                                                <Card.Text className={`tool-status ${item.status.toLowerCase()}`}>
                                                                    {item.status}
                                                                </Card.Text>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <p>No tools available for this category.</p>
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CategoryOffcanvas;
