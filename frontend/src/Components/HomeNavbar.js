import React, { useState,useContext } from 'react';
import {Container,Nav,Navbar,Image} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styles from '../Assets/styles.module.css';
//import SearchBar from './searchBar';
import carticon from '../Assets/carticon.png';
import search from '../Assets/search.png';

import CategoryLists from '../pages/CategoryLists';
import Profile from '../pages/Profile';
import Notification from '../pages/Notification'
import SearchBar from './SearchBar';
import AuthContext from '../context/AuthContext';
import CategoryOffcanvas from '../pages/CategoryOffcanvas';
//import CategoryOffcanvas from '../pages/CategoryOffcanvas';
//import LocationOffcanvas from '../pages/LocationOffcanvas';
//import logo from '../Assets/logo.jpg';


function HomeNav() {
  const [currentPage,setCurrentPage] = useState(null);

  const handleMouseMove = (page) =>{
    setCurrentPage(page)
  }
  let {user} =useContext(AuthContext);
  return (
    <div>
          {user &&(

        <Navbar className={styles.NavBar} >
        <Container >
          <div>
            <Navbar.Brand className={styles.brand} href="/">
            DIGITAL PLATFORM FOR SHARING TOOLS
              </Navbar.Brand>
      
          </div>
            
            <Nav className="Nav-Link">
              <Nav.Link as={Link} to="/Search" 
              >
              <Image src={search}
              width='20px'
              height='20px'
              />
              </Nav.Link>
            <Nav.Link >
            <CategoryOffcanvas />
            </Nav.Link>
            <Nav.Link as = {Link} to="/Post">
            POST TOOL
            </Nav.Link>
            <Nav.Link>
            </Nav.Link>
            <Nav.Link className='text-light' >
              <Notification />
            </Nav.Link>
            <Nav.Link className='text-light'>
              <Profile />
            </Nav.Link>
            {user && <p> Hi,{user.username}</p> }
            
          
            
            </Nav>
            
            
           
        </Container>
        </Navbar>
    )}

      {/* { currentPage ==='Categories' && <CategoryLists />} */}

    </div>
  )
}

export default HomeNav