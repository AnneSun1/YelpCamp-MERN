import FormText from '../components/FormText';
import ButtonGreen from '../components/ButtonGreen';
import Layout from '../layouts/Boilerplate';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { handle } from 'express/lib/router/index';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(name);
        console.log(value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent page from refreshing
        try {
            let url = 'http://localhost:3010/register';
            let body = formData;
            const res = await axios.post(url, formData, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              });
              if (res.status == 200) {
                console.log("Registration successful.");
              }
        } catch(err) {
            console.log(err.response.data);
        }
    };

    return (
        <Layout>
            <div class="row">
            <div class="mb-3 mt-3 px-5">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" placeholder="Enter username" value={formData.username} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                {/* must use a field of form control that appears in the tag */}
                <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
            </Form.Group>
            <Button variant="success" type="submit">
                Submit
            </Button>
            </Form>
            </div>
            </div>
        </Layout>
    )
}