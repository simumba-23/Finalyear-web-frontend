import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Container, Table, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import '../App.css';

const sections = [
  { title: 'Personal Info', fields: ['first_name', 'last_name', 'sex'], className: 'header-personal' },
  { title: 'Contact Info', fields: ['phone_number', 'email'], className: 'header-contact' },
  { title: 'Payment Info', fields: ['phone_number', 'lipa_Number', 'account_Number'], className: 'header-payment' }
];

function UserInfo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, authTokens } = useContext(AuthContext);
  const accessTokens = authTokens.access;
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get_userInfo/", {
          headers: {
            'Authorization': `Bearer ${accessTokens}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error.message);
        console.error(error.response.data);  
        console.error('Error:', error.message);
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      

      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, accessTokens]);

  const handleEdit = (section) => {
    const sectionData = {};
    section.fields.forEach(field => {
      sectionData[field] = data[field];
    });
    setCurrentSection(section);
    setFormData(sectionData);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/get_userInfo/", {
        headers: {
          'Authorization': `Bearer ${accessTokens}`,
        },
      });
      // Perform any additional actions after successful deletion
    } catch (error) {
      setError(error.message);
      
      
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://127.0.0.1:8000/api/get_userInfo/", formData, {
        headers: {
          'Authorization': `Bearer ${accessTokens}`,
        },
      });
      setData(response.data);
      setShowEditModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="container-custom">
      {user && (
        <Row>
          <Col>
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className={`header-custom ${section.className}`}>{section.title}</h3>
                <Table responsive="sm" className="table-custom">
                  <thead>
                    <tr>
                      {section.fields.map((field) => (
                        <th key={field}>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {section.fields.map((field) => (
                        <td key={field}>{data[field]}</td>
                      ))}
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(section)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => setShowDeleteModal(true)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ))}

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title className="modal-title-custom">Edit {currentSection?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                  {currentSection?.fields.map((field) => (
                    <Form.Group controlId={field} key={field}>
                      <Form.Label>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
                      <Form.Control type="text" name={field} value={formData[field] || ''} onChange={handleChange} />
                    </Form.Group>
                  ))}
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default UserInfo;
