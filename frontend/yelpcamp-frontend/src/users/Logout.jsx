import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
    const [loggedOut, setLoggedOut] =  useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.get('http://localhost:3010/logout');
                console.log(response);
                if (response.status === 200) {
                    setLoggedOut(true);
                    navigate('/');
                } else {
                    console.log(response);
                }
            } catch(error){
                    console.log(error)
            }
        }
        logout();
    }, [navigate])


    return (
        <div>Not logged out</div>
    ) 
}