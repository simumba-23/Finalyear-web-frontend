import React, { useContext } from 'react';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import search from '../Assets/search.png';

import Profile from '../pages/Profile';
import AuthContext from '../context/AuthContext';
import CategoryOffcanvas from '../pages/CategoryOffcanvas';
import '../App.css';
import msg from '../Assets/notify.png';

function HomeNav() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <Navbar className="Nav-Container" expand="lg">
          <Container fluid>
            <Navbar.Brand className="Nav-Brand" href="/">
              DIGITAL PLATFORM FOR SHARING TOOLS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="Nav-Linker me-auto">
                <Nav.Link>
                  <CategoryOffcanvas />
                </Nav.Link>
                <Nav.Link as={Link} to="/Post">
                  POST TOOL
                </Nav.Link>
                <Nav.Link as={Link} to="/Search">
                  <Image src={search} width="20px" height="20px" className="search-icon" /> SEARCH TOOL
                </Nav.Link>
                <Nav.Link as={Link} to='/ToolRequest'>
                <Image src={msg}
                width='20px'
                height='20px'
                /> NOTIFICATIONS
                </Nav.Link>
                <Nav.Link>
                  <Profile /> {/* Remove "Profile" text here */}
                </Nav.Link>
              </Nav>
              <div className="user-greeting">
                {user && <p>Hi, {user.username}</p>}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default HomeNav;
