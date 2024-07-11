import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios'



function ReviewRating({tooldetail}) {
    //const [reviews,setReviews] = useState('');
   const  [formData,setFormData] = useState({
   content:'',
    rating:0,
    
   })
    
    const handlechange = (e) => {
        const {name,value} = e.target;
        setFormData((prevData) =>({
            ...prevData, [name]:value

        }));
    console.log(e.target.value);

    };
    const ratingChanged = (newRating) => {
     //   setRating(newRating)
        setFormData((prevData) => ({
            ...prevData,
            rating: newRating
        }));
        console.log(newRating);
    };
   
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      //  const formData = {rating,reviews};
        
            try {
                const Response = await axios.post(`http://127.0.0.1:8000/api/${tooldetail.id}/reviews/`,{
                    ...formData,tool:tooldetail.id
                });
                console.log('Submission successful:', Response.data);
            } catch (error) {
                console.error('Submission error:', error);
                console.error('Error:', error.message);
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
        
            }
    
    };

    
    return (
    <div>
    <Form onSubmit={handleSubmit}>
        Rate Item:
    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    isHalf={true}
    name='rating'
    value={formData.rating}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"

/>
        <Form.Group className=''>
        <Form.Control as='textarea'
        name='content'
        placeholder='Write your reviews here'
        value={formData.content}
        onChange={handlechange}
        />
        <Button className='bg-secondary mt-2' type='submit' disabled={!formData.content}>submit</Button>
        </Form.Group>
        </Form>
    </div>
    )
}

export default ReviewRating;