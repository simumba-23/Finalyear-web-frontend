import React, { useState } from 'react';
import { Form, InputGroup, Button, Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import styles from '../Assets/styles.module.css';
import axios from 'axios';

function SearchBar() {
  const [searchData, setSearchData] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tool_search', {
        params: { query: searchData }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const BASE_URL = 'http://127.0.0.1:8000/';

  return (
    <div className="search-container">
      <Container>
        <div className="search-bar mt-4">
          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                value={searchData}
                placeholder="Search tools by category, location, name, etc."
                onChange={handleSearchChange}
              />
              <Button variant="primary" onClick={handleSearch}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Search'}
              </Button>
            </InputGroup>
          </Form.Group>
        </div>

        <Row>
          {searchResults.map((result) => (
            <Col xs={12} md={6} lg={4} key={result.id} className="mb-4">
              <Card className={`h-100 ${styles.card}`}>
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}${result.image}`}
                  alt={result.name}
                  style={{ width:"100%" , height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{result.name}</Card.Title>
                  <Card.Text className="text-muted">TZS {result.price} /=</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchBar;
