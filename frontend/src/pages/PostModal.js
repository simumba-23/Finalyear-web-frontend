import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import '../App.css';
import styles from '../Assets/styles.module.css';

function PostModal() {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    location: '',
    image: null,
  });
  const { user, authTokens } = useContext(AuthContext);
  const accessTokens = authTokens.access;

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, locationsResponse] = await axios.all([
          axios.get('http://127.0.0.1:8000/api/get_category'),
          axios.get('http://127.0.0.1:8000/api/get_location'),
        ]);
        setCategories(categoriesResponse.data);
        setLocations(locationsResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.location) {
      setError('Category and location are required.');
      return;
    }

    try {
      const formDataSend = new FormData();
      formDataSend.append('name', formData.name);
      formDataSend.append('price', formData.price);
      formDataSend.append('category', formData.category);
      formDataSend.append('location', formData.location);
      formDataSend.append('description', formData.description);
      formDataSend.append('image', formData.image);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/post_tool',
        formDataSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessTokens}`,
          },
        }
      );

      alert('Data saved successfully');
      console.log('Data', response.data);

      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        location: '',
        image: null,
      });
      setError('');
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        setError(error.response.data.detail || 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Container>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          {user && (
            <Row className='justify-content-center'>
              <Col xs={12} md={6} lg={6} className='my-2'>
                <Card className='p-4 custom-card-shadow'>
                  {error && (
                    <Alert variant='danger' onClose={() => setError('')} dismissible>
                      {error}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='tool_name'>
                      <Form.Label>Tool Name</Form.Label>
                      <Form.Control
                        name='name'
                        type='text'
                        placeholder='Tool Name'
                        value={formData.name}
                        onChange={handleChange}
                        autoFocus
                        required
                      />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='Price'>
                      <Form.Label>Price per day</Form.Label>
                      <Form.Control
                        name='price'
                        type='number'
                        placeholder='Price'
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId='image' className='mb-3'>
                      <Form.Label>Image</Form.Label>
                      <Form.Control type='file' name='image' onChange={handleImageChange} required />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='category'>
                      <Form.Label>Category</Form.Label>
                      <Form.Control as='select' name='category' value={formData.category} onChange={handleChange} required>
                        <option value=''>Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='location'>
                      <Form.Label>Location</Form.Label>
                      <Form.Control as='select' name='location' value={formData.location} onChange={handleChange} required>
                        <option value=''>Select Location</option>
                        {locations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.region}, {location.district}, {location.ward}, {location.address}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        name='description'
                        placeholder='Type here ...'
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Button type='submit' className='w-100'>
                        Save
                      </Button>
                    </Form.Group>
                  </Form>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
}

export default PostModal;
