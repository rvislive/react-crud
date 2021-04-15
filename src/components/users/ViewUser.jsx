import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewUser = () => {
    const { userId } = useParams();

    const [ user, setUser ] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    });

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8001/users/${userId}`)
        setUser(result.data);
    }
    
    const { name, username, email, phone, website } = user;
    return(
       <div className="container text-center mt-4">
           <Link className="btn btn-secondary" to="/">Back</Link>
            <div className="view-user">
                <p>User Id: {userId}</p>
                <p>Name: {name}</p>
                <p>UserName: {username}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Website: {website}</p>
            </div>
       </div>
    )
}

export default ViewUser;