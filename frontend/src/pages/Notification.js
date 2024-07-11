 import { useState } from 'react';
import {Image} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import msg from '../Assets/notify.png';
import { Link } from 'react-router-dom';


function Notification() {
  const [show, setShow] = useState(false);
  const [requests,setRequest] = useState([])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Link variant="primary" onClick={handleShow}>
    <Image src={msg}
            width='20px'
            height='20px'
            />
    </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body> No Notifications available for Now</Modal.Body>
        </Modal>
    </>
  );
}

export default Notification;