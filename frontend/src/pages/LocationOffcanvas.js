import React from 'react';
import { useState } from 'react';
import {Button} from 'react-bootstrap';
import {Offcanvas} from 'react-bootstrap';



function LocationOffcanvas() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
    <div>
            <Button variant="primary" onMouseEnter={handleShow}>
            LOCATION
            </Button>

        <Offcanvas show={show} onClick={handleClose}  placement='top' className=' h-100 mt-5 mb-5'>
        <Offcanvas.Header  closeButton >
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
    
    </Offcanvas>
    </div>
    );
}

export default LocationOffcanvas;