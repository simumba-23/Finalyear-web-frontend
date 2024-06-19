import { useContext, useState } from 'react';
import {Image,Nav,Row,Col,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import icon from '../Assets/icon.png';
import AuthContext from '../context/AuthContext';



function Profile() {
const [isProfileOpen, setIsProfileOpen] = useState(false);
const {user,logoutUser} = useContext(AuthContext)

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };



  return (

    <>
    {user && (
<>
    <Row>
        <Col>
    <Link variant="primary"  onClick={toggleProfile} style={{ cursor: 'pointer',zIndex: 3}}>
    <Image src={icon}
            width='20px'
            height='20px'
            />
    </Link>
  {isProfileOpen && (
     <Card style={{ position: 'absolute', top: '50px', width:'200px', zIndex: 2 }} >
        <Card.Header >
            My Profile
        </Card.Header>
        <Card.Body>
            <Nav>
            < div>
                <Nav.Link as={Link}  to='/userInfo'>
                Profile
                </Nav.Link>
                <Nav.Link as={Link} to='/myTools'>My Tools</Nav.Link> 
                <Nav.Link as = {Link}  onClick={logoutUser}>Logout</Nav.Link>

            </div>

            </Nav>
            </Card.Body>
        
    </Card>
                )}
   
        </Col>
    </Row>
    </>
  )}

    </>
);
}

export default Profile;