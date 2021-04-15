import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8001/users");
        setUser(result.data.reverse())
    }

    const deleteUser = async userId => {
        await axios.delete(`http://localhost:8001/users/${userId}`);
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <h3>Home Page</h3>
                <table class="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className="btn btn-sm btn-primary mr-2" to={`/users/${user.id}`}>View</Link>
                                        <Link className="btn btn-sm btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>Edit</Link>
                                        <Link className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;