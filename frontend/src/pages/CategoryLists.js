import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap'
import axios from 'axios';
import '../App.css'


function CategoryLists() {
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const Response = await axios.get('http://127.0.0.1:8000/api/get_category');
                setCategories(Response.data);
                console.log(Response.data)
                
            } catch (error) {
                
            }
        }
        fetchData()
    },[])
return (
    <div>
        <Nav >
            {categories.map((category) =>(
                <Nav.Link key={category.id}>{category.id},{category.name}</Nav.Link>)
            )}
        </Nav>
    </div>
  )
}

export default CategoryLists