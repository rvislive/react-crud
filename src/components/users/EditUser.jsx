import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
  
const EditUser = () => {
    let history = useHistory();
    const { userId } = useParams();

    const [ user, setUser ] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    })
 
    const onInputChange = e => {
        setUser({...user, [e.target.id] : e.target.value }) // Please read it two times always
    }

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:8001/users/${userId}`, user);
        history.push("/");
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8001/users/${userId}`);
        setUser(result.data)
    }

    const { name, username, email, phone, website } = user;
    return (
        <div className="container">
            <h3 className="text-center mt-4">Update a User</h3>
            <div className="user-form">
                <form onSubmit={e => onSubmit(e)} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" 
                            value={name}
                            onChange={e => onInputChange(e) }
                            />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" 
                            value={username}
                            onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="example@email.com"
                            value={email}
                            onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" placeholder="960-865-0941" 
                            value={phone}
                            onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div className="col-md-12 mt-2">
                        <label htmlFor="website" className="form-label">Website</label>
                        <input type="text" className="form-control" id="website" placeholder="www.example.com" 
                            value = {website}
                            onChange={e => onInputChange(e)}
                        />
                    </div>

                    <div className="col-12 mt-3 text-right">
                        <button type="submit" className="btn btn-warning">Update User</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;