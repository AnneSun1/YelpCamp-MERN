import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess } from '../redux/slices/userSlice'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Layout from '../layouts/Boilerplate';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(fetchUserRequest());
            const res = await axios.post('http://localhost:3010/login', formData, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }); 
            if (res.status === 200) {
                const user = res.data;
                console.log(user) // i sent back 200 code not user info
                dispatch(fetchUserSuccess(user));
                localStorage.setItem('user', JSON.stringify(user)); // Save the user info in localStorage for persistence
                console.log("Welcome back!");
                navigate("/campgrounds");
            } else {
                console.log(res.status);
            }
            
        } catch (err) {
            console.log(err);
            dispatch(fetchUserFailure(err.message));
        }
        
    }

   
    return (
        <Layout>
            <div className="row">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" placeholder="Enter username" value={formData.username} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                </Form.Group>
                <Button variant="success" type="submit">
                Submit
            </Button>
            </Form>
            </div>
        </Layout>
    )
}

export default Login;