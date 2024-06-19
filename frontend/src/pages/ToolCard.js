import React from 'react'
import {Card,Nav} from 'react-bootstrap'
import {Container,Row,Col} from 'react-bootstrap'
import styles from '../Assets/styles.module.css';

function ToolCard({item}) {
  return (
    <>
    <Container >
            <Row>
                    <Col>
                    <div style={{display:'grid'}}> 
                    <Nav>
                    <Card className= 'display' style={{width :'20rem'}} >
                      
                        <Card.Img className='img' variant='top' src={item.image}  alt={item.name}/>
                        <Card.Body className={styles.content}>
                        <div className='fw-bold mb-1 pb-3'>
                        <Card.Text className='float-start' >{item.name}</Card.Text>
                        <Card.Text className='float-end'>{item.price}</Card.Text>
                        </div> 
                        </Card.Body>

                    </Card>
                    </Nav>
    
                    </div>
                        
                        </Col>
                
            </Row>
    </Container></>
  )
}

export default ToolCard