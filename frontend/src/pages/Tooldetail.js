import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewRating from './ReviewRating';

function Tooldetail(props) {
    const { id } = useParams();
    const [tooldetail, setToolDetail] = useState([]);
    const [ownerInfo, setOwnerInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Set to true initially
    const navigate = useNavigate(); // Corrected hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/get_Tooldetail/${id}`);
                setToolDetail(response.data);
                console.log(response.data);
                let ownerInfo = response.data.owner;
                setOwnerInfo(ownerInfo);
                console.log('fetchOwnerInfo', ownerInfo);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const BASE_URL = 'http://127.0.0.1:8000/';

    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} md={8} lg={6}>
                        <Card className='mt-5'>
                            {tooldetail.image && (
                                <Card.Img style={{ width: '100%', height: "500px" }} variant='top' src={`${BASE_URL}${tooldetail.image}`} alt={tooldetail.name} />
                            )}
                        </Card>
                    </Col>
                    <Col xs={12} md={8} lg={5}>
                        <Card className='mt-5 justify-content-center p-3'>
                            <Card.Header>{tooldetail.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>{tooldetail.description}</Card.Text>
                            </Card.Body>
                            <ReviewRating tooldetail={tooldetail} id={id} />
                        </Card>
                        <Button className='bg-success m-3' onClick={() => navigate('/OwnerInfo', { state: { ownerInfo } })}>Owner Info</Button>
                        <Button className='bg-secondary' onClick = {() => navigate('/chat', { state: { tooldetail }})}>Contact Owner</Button>
                        <Button className='bg-warning m-3'  onClick = {() => navigate('/Scheduling', { state:{tooldetail}})}>Lend Request</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Tooldetail;
