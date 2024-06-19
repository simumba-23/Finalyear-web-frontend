import React,{useState,useEffect,useContext} from 'react';
//import HomeNavbar from '../Components/HomeNavbar';
import {Container,Row,Col,Card,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styles from '../Assets/styles.module.css';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function MyTool() {
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState()
    const {user,authTokens} = useContext(AuthContext);
    const accessTokens = authTokens.access

    useEffect(() =>{
        const fetchData = async() =>{
            try {
                const Response = await axios.get("http://127.0.0.1:8000/api/get_tool_owner",{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessTokens}`,
                    }
                    });
                setData(Response.data);
                console.log(Response.data)
                
            } catch (error) {
                setError(error)
                
            }
        
        };
        fetchData();
    },[]);
    if(error){
        return <div>{error.message}</div>;
    }
    if(!Response){
setLoading('loading ....')
    }
    const BASE_URL = 'http://127.0.0.1:8000/';

    return (
    <>  {user ? (
        <>
        <hr />
        <Container>
<Nav>
    <Nav.Link >
    <Row> 

    {data.map((item) => ( 
    <Col xs={12} md={6} lg={4} key={item.id}> 
        <Link to={`/Tooldetail/${item.id}`} >     
        <div style={{ display: 'grid' }}>
        <Card className='display my-3' style={{ }}  >
            <Card.Body className={styles}>
            <Card.Img style={{ width: '100%', height:"150px" }} variant='top' src={`${BASE_URL}${item.image}`} alt={item.name} />
            <hr/>
            <div className='fw-bold mb-1 pb-3'>
                <Card.Text className='float-start'> {item.name}</Card.Text>
                <Card.Text className='float-end'>TZS {item.price} /=</Card.Text>
            </div>
            <div>
            
            </div>
            </Card.Body>
        </Card>
        </div>
        </Link>
    </Col>
    ))}
    </Row>

    </Nav.Link>
</Nav>

        </Container>
        </>

    ):<p>Loading.....</p>}

    
    </>
    );
}

export default MyTool;

