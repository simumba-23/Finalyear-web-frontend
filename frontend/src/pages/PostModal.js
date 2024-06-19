import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import { Button,Card,Container,Row,Col,Form,Image} from 'react-bootstrap';
//import HomeNav from '../Components/HomeNavbar';
import loginlogo from '../Assets/loginlogo.png';
import AuthContext from '../context/AuthContext';



function PostModal() {
    const [categorys,setCategory] = useState([])
    const [locations,setLocations] = useState([])
    const [error,setError] = useState('')
    const [formData,setFormData] = useState({
        name:'',
        price:'',
        description:'',
        category:'',
        location:'',
        image:null,
    
    });
const {user,authTokens} = useContext(AuthContext);
const accessTokens = authTokens.access
console.log('access:',accessTokens)
    const handleImageChange = (e) =>{
    setFormData((prevData)=>({
        ...prevData,
        image:e.target.files[0],
    }))
    }
    
    const handleChange = (e) =>{
        
        const {name,value} = e.target;
        setFormData((prevData) =>({ ...prevData,[name]:value}));
        console.log(e.target.value)
        

    };
    
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const [categoriesResponse,locationsResponse] = await axios.all([
                axios.get('http://127.0.0.1:8000/api/get_category'),
                axios.get('http://127.0.0.1:8000/api/get_location')  
            ]);
            setCategory(categoriesResponse.data);
            setLocations(locationsResponse.data)
            }catch(error){
                console.log(error)
                
            }
        };
        fetchData();

    },[])

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
            console.log('AuthTokens',authTokens)
            console.log('user',user.username)
            const Response = await axios.post('http://127.0.0.1:8000/api/token/post_tool',{
                ...formData, user:user.id
            },{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessTokens}`,
                    }
            });
            alert('data saved successfuly')
            console.log('received data:', Response.data)
            setFormData({
                name:'',
                price:'',
                description:'',
                category:'',
                location:'',
                image:null,
            
            })
        }catch(error){
            console.log('err:',error);
            console.error('Error:', error.message);
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            setError("something is no okay!!")
            
    
        }


        
    }

    return (
        <>
<hr/>
{user &&(

<Container >
<Row className='justify-content-center'>
        <Col xs={12} md={6} lg={5} className='my-2'>
    <Card className='p-5'style={{background:'#088f8f'}}>
    {/* <Image src={loginlogo} width='100%' height='250px'></Image> */}

                    
<Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="tool_name">
        <Form.Label>Tool Name</Form.Label>
        <Form.Control
        name='name'
        type="text"
        placeholder="Tool Name"
        value={formData.name}
        onChange={handleChange}
        autoFocus
        />
    </Form.Group>

    <Form.Group className="mb-3" controlId="Price">
        <Form.Label>Price per day</Form.Label>
        <Form.Control
        name='price'
        type='number'
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}

        autoFocus
        />
    </Form.Group>
    

    <Form.Group controlId='image'>
    <Form.Label >Image: </Form.Label>
    <Form.Control 
    type='file'
    name='image'
    onChange={handleImageChange} 
    autoFocus
    />   
    
    </Form.Group>

    <Form.Group className="mb-3" controlId="category">
        <Form.Label>category</Form.Label>
        <Form.Control 
        as = 'select' 
        name='category'
        value={formData.category}
        onChange={handleChange}
    
        >
        <option value=''>Select Category</option>
        {
            categorys.map((category)=>(
                <option key={category.id} value={category.id}>{category.name}</option>
            ))
        }

        </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control 
        as = 'select' 
        name='location'
        value={formData.location}
        onChange={handleChange}
        
        >
        <option value=''>Select Location</option>
        {
            locations.map((location)=>(
                <option key={location.id} value={location.id}>{location.region},{location.district},{location.ward},{location.address}</option>
            ))
        }
        </Form.Control>
        </Form.Group>

        
    <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3}
        type="Text"
        name='description'
        placeholder="type here ..."
        value={formData.description}
        onChange={handleChange}

        autoFocus
        />
        
    </Form.Group>
    
    {error &&(<p className='text-light text-center'>{error}</p>)}
    
    <Form.Group>
        <Button value='Submit' type="submit" className='bg-success w-100'>POST</Button>
    </Form.Group>

</Form>
            </Card>
        </Col>
    </Row>



</Container>
)}
    
            
        </>
    );
}

export default PostModal;