import React, { useState } from 'react';
import {Form,InputGroup,Button,Card,Row,Col, Container} from 'react-bootstrap'; 
import styles from '../Assets/styles.module.css';
import axios from 'axios';

function SearchBar() {
  const [searchData,setSearchData] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const handleSearchChange = (e) =>{
      const {value} = e.target;
        setSearchData(value);
        }
  
  const handlesearch = async() => {
    try {
      const Response = await axios.get('http://127.0.0.1:8000/api/tool_search',{
        params:{
          query:searchData
        }
      })
      setSearchResults(Response.data);
      console.log(Response.data);
    } catch (error) {
      console.log(error);
      
    }
  }
  const BASE_URL = 'http://127.0.0.1:8000/';

  return (
    <div>
      <Container>
      <div className="search-bar mt-3 ">
      <Form.Group>
        
      <InputGroup  style={{width:1000, alignContent:'center'}}>
      <Form.Control
        className='me-1'
        style={{}}  
        value={searchData}
        placeholder="Serach Tools by using one of Category,Location,Tool Name ...."
        onChange={handleSearchChange} 
        />
        <Button size='small'className='bg-secondary' onClick={handlesearch}>Search</Button>
      </InputGroup>    
      </Form.Group> 
      <Row> 

{searchResults.map((result) => ( 
<Col xs={12} md={6} lg={4} key={result.id}> 
    <div style={{ display: 'grid' }}>
    <Card className='display my-3' style={{ }}  >
        <Card.Body className={styles.content}>
        <Card.Img style={{ width: '100%', height:"150px" }} variant='top' src={`${BASE_URL}${result.image}`} alt={result.name} />
        <hr/>
        <div className='fw-bold mb-1 pb-3'>
            <Card.Text className='float-start'> {result.name}</Card.Text>
            <Card.Text className='float-end'>TZS {result.price} /=</Card.Text>
        </div>
        <div>
        
        </div>
        </Card.Body>
    </Card>
    </div>
</Col>
))}
</Row>
      
      
    </div>

      </Container>
      </div>

    
  );
}

export default SearchBar;

