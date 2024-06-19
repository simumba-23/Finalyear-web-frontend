import React,{useState,useEffect,useContext} from 'react'
import { Card, Container,Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

function OwnerInfo(props) {
    const location = useLocation()
    const ownerInfo = location.state?.ownerInfo   
    console.log('Owner Info:', ownerInfo);

    if (!ownerInfo) {
        return <p>Owner information is not available.</p>;
    }
    return(

        <Container>
                <h3 className='text-center text-light bg-success p-3 mt-3'>Payment Info</h3>

                <div>
                    <Card>
                        <Card.Header>
                        Phone Number
                        </Card.Header>
                        
                        <Card.Body>
                        {ownerInfo.phone_number}
                        </Card.Body>
                    
                        <Card.Header>
                         Lipa Number
                         </Card.Header>
                         
                         <Card.Body>
                         {ownerInfo.phone_number}
                         </Card.Body>
                     
                         <Card.Header>
                         Account Number
                         </Card.Header>
                         
                         <Card.Body>
                         {ownerInfo.phone_number}
                         </Card.Body>
                     
                         </Card>
          
                 </div>
             
                
            
            </Container>
        
    
  )
}

export default OwnerInfo