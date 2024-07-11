import React from 'react';
import { Card, Row, Col, Container, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { CreditCard, CreditCard2Front, Phone } from 'react-bootstrap-icons';
import '../App.css';

function OwnerInfo() {
    const location = useLocation();
    const ownerInfo = location.state?.ownerInfo;

    if (!ownerInfo) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Alert variant="danger">Owner information is not available.</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h3 className="text-center my-4">Payment Method</h3>
            <Row className="justify-content-center">
                <Col md={3} className="border rounded p-3 me-3 d-flex align-items-center custom-card-shadow">
                    <Phone size={64} color="green" className="me-3" />
                    <div>
                        <strong>PHONE NUMBER</strong> <br />
                        {ownerInfo.phone_number}
                    </div>
                </Col>
                <Col md={3} className="border rounded p-3 me-3 d-flex align-items-center custom-card-shadow">
                    <CreditCard size={64} color="royalblue" className="me-3" />
                    <div>
                        <strong>LIPA NUMBER</strong> <br />
                        {ownerInfo.lipa_Number}
                    </div>
                </Col>
                <Col md={3} className="border rounded p-3 d-flex align-items-center custom-card-shadow">
                    <CreditCard2Front size={64} color="purple" className="me-3" />
                    <div>
                        <strong>ACCOUNT NUMBER</strong> <br />
                        {ownerInfo.account_Number}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default OwnerInfo;
