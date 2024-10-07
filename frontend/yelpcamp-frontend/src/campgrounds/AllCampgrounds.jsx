import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Layout from '../layouts/Boilerplate';
import ClickCard from '../components/ClickCard';
import CampgroundsList from '../components/CampgroundsList';



export default function Campgrounds() {
    // Fetch all campgrounds from API by get request
    const [camps, setCamps] = useState([]);
    const fetchCamps = async () => {
        try {
            // correctly fetches the data from the get request
            const response = await axios.get("http://localhost:3010/campgrounds"); // axios fetches this route
            console.log(response.data);

            // DONT USE response.data.initialData
            setCamps(response.data); // Update the state with the fetched data
            // console.log(camps); <- this doesn't print out camps for some reason
        } catch (error) {
            console.log("Error while retrieving campgrounds");
        }
        
    };
    
    useEffect(() => {
        fetchCamps();
        console.log(camps.length);
        console.log(camps);
    }, [])
    
    // Return page
    return (
            <Layout>
                <div className="row" >
                    <div className="col-md-4">
                        <h1>All Campgrounds</h1>
                        <div>
                            <Link to="campgrounds/new">Add Campground</Link>
                        </div>

                        <CampgroundsList campgrounds = { camps }></CampgroundsList>
                    </div>
                </div>
            </Layout>
    )
}
