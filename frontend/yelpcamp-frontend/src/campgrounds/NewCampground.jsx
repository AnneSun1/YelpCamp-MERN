import Layout from '../layouts/Boilerplate';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [authorized, setAuthorized] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3010')
            .then(response => {
                if (response.status === 200) {
                    setAuthorized(true);
                    console.log("Logged in")
                }

                if (response.status === 401) {
                    setAuthorized(false);
                    console.log("Not logged in")
                    navigate('/login');
                }
                console.log(authorized)
            })
            .catch(error => {
                console.log(error)
            })
    }, [navigate]);

   
    return authorized ? (
            <Layout>
                <div class="row">
                    <h1 class="text-center">New Campground</h1>
                    <div class="col-6 offset-3">
                        <form action="/campgrounds" novalidate class="validated-form" enctype="multipart/form-data">
                            <div class="mb-3">
                                <label class="form-label" for="title">Title</label>
                                <input class="form-control" type="text" id="title" name="campground[title]" required></input>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="location">Location</label>
                                <input class="form-control" type="text" id="location" name="campground[location]" required></input>
                            </div>

                            <div class="mb-3">
                                <label for="price" class="form-label">Campground Price</label>
                                <div class="input-group">
                                <span class="input-group-text" id="price-label">$</span>
                                <input type="text" class="form-control" id="price" placeholder="0.0" aria-label="Price" aria-describedby="price-label"
                                name="campground[price]" required></input>
                            </div>
                            </div>
                            
                            <div class="mb-3 form-file custom-file">
                                <label>Image(s)</label>
                                <label for="formFileMultiple" class="form-label custom-file-label"></label>
                                <input class="form-control" type="file" id="image" name="image" multiple></input>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="description">Description</label>
                                <textarea class="form-control" type="text" id="description" name="campground[description]" required></textarea>
                            
                            </div>

                            <div class="mb-3">
                                <button class="btn btn-success">Add Campground</button> 
                            </div>
                            
                    
                        </form>
                        <a href="/campgrounds">All Campgrounds</a>
                    </div>
                </div>
            </Layout>
    ) : null
}