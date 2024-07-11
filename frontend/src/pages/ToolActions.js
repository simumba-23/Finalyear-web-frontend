import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

const ToolActions = ({ item, onUpdate, onDelete }) => {
    const [formData, setFormData] = useState({
        name: item.name,
        description: item.description,
        price: item.price,
        location: item.location,  // Assuming location is an object
        category: item.category   // Assuming category is an object
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'location' || name === 'category') {
            setFormData({
                ...formData,
                [name]: {
                    ...formData[name],
                    [e.target.dataset.field]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        axios.put(`http://127.0.0.1:8000/api/tool_delete_or_update/${item.id}/`, formData)
            .then(response => {
                onUpdate(response.data);
                setShowAlert(true);
                setShowUpdateModal(false);
            })
            .catch(error => {
                setError("There was an error updating the item!");
                console.error('Error:', error.message);
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = () => {
        setLoading(true);
        setError(null);
        axios.delete(`http://127.0.0.1:8000/api/tool_delete_or_update/${item.id}/`)
            .then(() => {
                onDelete(item.id);
                setShowDeleteModal(false);
            })
            .catch(error => {
                setError("There was an error deleting the item!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header className='Text-center'>
                    <Modal.Title>Update Tool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="category_name">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" name="category" data-field="name" value={formData.category.name} onChange={handleChange} />
                        </Form.Group>
                        {/* <Form.Group controlId="location_name">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" name="location" data-field="name" value={formData.location.name} onChange={handleChange} />
                        </Form.Group> */}
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" className='m-3' type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Update Tool'}
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className='m-3 p-2' dismissible>{error}</Alert>}
                    {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Tool updated successfully!</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger" className='m-3 p-2' dismissible>{error}</Alert>}
                    {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>Tool updated successfully!</Alert>}
                    Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <FaEdit onClick={() => setShowUpdateModal(true)} style={{ cursor: 'pointer', marginRight: '10px', marginLeft: '10px', color: 'green' }} size={24} />
            <FaTrash onClick={() => setShowDeleteModal(true)} style={{ cursor: 'pointer', marginRight: '10px', color: 'red' }} size={24} />
            <Link to={`/Tooldetail/${item.id}`}>
                <FaInfoCircle style={{ cursor: 'pointer', color: 'blue' }} size={24} />
            </Link>
        </div>
    );
};

export default ToolActions;
