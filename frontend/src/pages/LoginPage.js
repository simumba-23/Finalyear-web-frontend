import React, {useState,useContext } from 'react'
import { Form,InputGroup,Image,Button,Row,Col, Container, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import user from '../Assets/user.png';
import password from '../Assets/password.png';
import loginlogo from '../Assets/loginlogo.png';
import simumba from '../Assets/toolsharingsimumba.png';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  let {loginUser} = useContext(AuthContext)

  
  return (
    <>
    <Container>
    <Row className='justify-content-center py-5'> 
        <Col xs={12} md={4} lg={6} >
          <Card style={{background:'#088f8f',padding:'10px'}}>
            <Card.Header className='text-center'>DIGITAL PLATFORM FOR SHARING TOOLS</Card.Header>
            <Image src={simumba} width='100%' height='250px'></Image>
              <Form onSubmit={loginUser}>
              <Form.Group>
            <Form.Label>Username</Form.Label>
            <InputGroup>
          <Image src={user} alt='not support'
            height='30px'
            width='30px'
            />
            <Form.Control 
            type='text'
            size='small'
            name='username'
            placeholder='Enter Username'
            /> 
            </InputGroup>

            </Form.Group>
            <Form.Group>
            <span><Form.Label>Password</Form.Label><Link to='/Register' className='text-dark text-decoration-none float-end'>Forgot Password?</Link></span> 
              <InputGroup>
              <Image src={password} alt='not support'
            height='30px'
            width='30px'
            />
          
              <Form.Control 
                type='password'
                size='small'
                placeholder='Password'
                name='password'

                />

              </InputGroup>
                <p></p>          
                  </Form.Group>
                <span> Don't you have an Accont? <Link to='/Register' className='text-dark text-decoration-none'>Register</Link></span>
            <Button style={{background:'#088f8f',marginTop:'15px'}} className="w-100" size='small' type='submit'>Login</Button>
 
       
              </Form>
          </Card>
        </Col>
      </Row>
      
    </Container>
       

    </>
  )
}

export default LoginPage