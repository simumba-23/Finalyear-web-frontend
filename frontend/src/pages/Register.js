import React from 'react';
import {Button, Card, Form, FormControl} from 'react-bootstrap';
import { Container,Row,Col,Image} from 'react-bootstrap';
import loginlogo from '../Assets/loginlogo.png';
import simumba from '../Assets/toolsharingsimumba.png';

import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [formData,setFormData] = useState({
        first_name:'',
        last_name:'',
        username:'',
        email:'',
        password:'',
        confirm_password:'',
        sex:'',
        phone_number:'',
        image:null,
    }     
    );
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
    }));
    };

    const handleChange = (e) =>{
        
        const {name,value} = e.target;
        setFormData((prevData) =>({ ...prevData,[name]:value}));
        

    };
    const handleFormSubmit = async(e) =>{
        e.preventDefault();
    
        if(formData.password ===formData.confirm_password){
            const formDataToSend = new FormData();
            formDataToSend.append('first_name',formData.first_name);
            formDataToSend.append('last_name',formData.last_name);
            formDataToSend.append('username',formData.username);
            formDataToSend.append('email',formData.email);
            formDataToSend.append('password',formData.password);
            formDataToSend.append('sex',formData.sex);
            formDataToSend.append('phone_number',formData.phone_number);
            formDataToSend.append('image',formData.image);
            try{
                await axios.post('http://127.0.0.1:8000/api/register',formDataToSend,{
                    headers:{
                        "Content-Type": 'multipart/form-data'
                    }
                });
                alert('user created successfully');
                setFormData({
                    first_name:'',
                    last_name:'',
                    username:'',
                    email:'',
                    password:'',
                    confirm_password:'',
                    sex:'',
                    phone_number:'',
                    image:null,
                });
            
            }catch(error){
                alert('error during registration:')
            }
  
        }else{
            alert('Password mismatch try again')
        }
            
        
    }
    
    return (
    <>
        <Container  >
            <Row className='justify-content-center py-5'>
            <Col xs={12} md={4} lg={6}>
            <Card style={{background:'#088f8f'}}>
            <Card.Header className='text-center'>DIGITAL PLATFORM FOR SHARING TOOLS</Card.Header>

            <Image src={simumba} width='100%' height='250px'></Image>

            <Card.Body className='p-4'>
            <hr/>
            <Form onSubmit={handleFormSubmit} >
            <Form.Group controlId='First Name'>
            <Form.Label >First Name:</Form.Label>
                <FormControl 
                name='first_name' 
                placeholder='First Name'
                value={formData.first_name} 
                onChange={handleChange}
                autoComplete='firstName'
                />
            </Form.Group>

            <Form.Group controlId='Last Name'>
            <Form.Label >  Last Name:</Form.Label>
                <FormControl 
                type='text'
                name='last_name' 
                
                placeholder='Last Name'
                value={formData.last_name} 
                onChange={handleChange}

                />
            
            </Form.Group>
            
            <Form.Group controlId = 'username'>
            <Form.Label >Username:</Form.Label>
                <FormControl 
                type='text'
                name='username' 
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}

                />
            
            </Form.Group>
 
            <Form.Group controlId='Email Adress'>
            <Form.Label>Email Adress:</Form.Label>
                <FormControl 
                type='email'
                name='email' 
                placeholder='Email'
                value={formData.email} 
                onChange={handleChange}

            
                />
    

            </Form.Group>
            
            <Form.Group controlId='Password'>
            <Form.Label >Password:</Form.Label>
                <FormControl 
                type='password'
                name='password' 
                placeholder='Password'
                value={formData.password} 
                onChange={handleChange}
                autoComplete='password'

                />
            
            </Form.Group>
            <Form.Group controlId='Confirm Password'>
            <Form.Label >Confirm Password: </Form.Label>
                <FormControl 
                type='password'
                name='confirm_password' 
                placeholder='Confrim Password'
                value={formData.confirm_password} 
                onChange={handleChange}

                />
            
            </Form.Group>
            <Form.Group controlId='Phone Number'>
            <Form.Label >Phone Number:  </Form.Label>
                <FormControl 
                type='text'
                name='phone_number' 
                placeholder='Phone Number'
                value={formData.phone_number} 
                onChange={handleChange}

                />  
            
            </Form.Group>
            <Form.Group controlId='Sex'>
            <Form.Label >Sex:  </Form.Label>
                <FormControl 
                type='text'
                name='sex' 
                placeholder='Sex'
                value={formData.sex} 
                onChange={handleChange}

                />  
            
            </Form.Group>
            
                <Form.Group controlId='Image'>
                <Form.Label >Image:  </Form.Label>
                <FormControl 
                type='file'
                name='image' 
                onChange={handleImageChange}

                />   
                
                </Form.Group>

                <Button variant='primary' type='submit' className='mt-3 w-100'>Register</Button>
    </Form>
    

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        
    </Container>

    </>
    );
}

export default RegisterForm;