import Layout from '../layouts/Boilerplate';
import CustomCard from '../components/CustomCard';
import Reviews from './Reviews';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function ShowCampground () {
    const { id } = useParams();
    const [camp, setCamp] = useState(null);
    const navigate = useNavigate();
    const fetchCamp = async () => {
        try {
            const response = await axios.get(`http://localhost:3010/campgrounds/${id}`);
            console.log(response.data);
            setCamp(response.data);
        } catch (err) {
            console.log('Could not fetch campground');
            navigate("/campgrounds");

        }
    };

    useEffect(() => {
        fetchCamp();
    }, [id]);

    if (!camp) {
        return (
            <Layout>
                <h1>Loading...</h1>
            </Layout>
        )
    }

    return (
        
            <Layout>
                <div className="row" >
                    <div className="col-md-4">
                        <CustomCard campground = { camp } ></CustomCard>
                    </div>
                    
                    <div className="col-md-4">
                        <Reviews reviews = { camp.reviews } id = {id} author = {camp.author}/>
                    </div>
                </div>
                
            </Layout>
    )
}
