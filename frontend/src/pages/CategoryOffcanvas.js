import { Offcanvas, Nav, Card, Row, Col, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CategoryOffcanvas() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [categories, setCategories] = useState([]);
    const [tools, setTools] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Response = await axios.get('http://127.0.0.1:8000/api/get_category');
                setCategories(Response.data);
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

    return (
        <div>
            <a href variant="primary" onMouseEnter={handleShow}>
                ALL CATEGORIES
            </a>
            <Offcanvas show={show} onHide={handleClose} placement='top' className=' h-100 mt-5 mb-5'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>All Category</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                    <Row>
                        <Col md={3}>
                            <Nav className="flex-column">
                                {categories.map((category) => (
                                    <Nav.Link key={category.id} onClick={() => handleCategory(category.id)}>
                                        {category.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </Col>
                        <Col md={9}>
                            {selectedCategory && (
                                <Row xs={1} md={2} className="g-4">
                                    {tools.map((item) => (
                                        <Col key={item.id}>
                                            <Link to={`/Tooldetail/${item.id}`}>
                                                <div>
                                                    <Card>
                                                        <Card.Body style={{
                                                            
                                                        }}>
                                                            <Card.Img style={{ width: '100%', height: "150px" }} variant='top' src={`${BASE_URL}${item.image}`} alt={item.name} />
                                                            <hr />
                                                            <div className='fw-bold mb-1 pb-3'>
                                                                <Card.Text className='float-start'> {item.name}</Card.Text>
                                                                <Card.Text className='float-end'>TZS {item.price} /=</Card.Text>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Col>
                    </Row>
                    </Container>
                
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CategoryOffcanvas;
