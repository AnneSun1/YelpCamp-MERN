import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonGreen from '../components/ButtonGreen'

import { useSelector } from 'react-redux';

const Reviews = ({ id, reviews, author }) => {
    const user = useSelector((state) => state.user.user);
    console.log(user);
    const [ reviewBody, setReviewBody ] = useState('');
    const updateReviewBody= (event) => {
        setReviewBody(event.target.value)
    }
    const addReview = async () => {
        try {
            const response = await axios.post(`http://localhost:3010/campgrounds/${id}/reviews`, { 
                review: {
                    rating: 3,
                    body: reviewBody
                }
            }, 
            {  
                withCredentials: true,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            })
        } catch (error) {
            console.log(error)
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            const response = await axios.delete(`http://localhost:3010/campgrounds/${id}/reviews/${reviewId}`, {
                withCredentials: true // include credentials to check if user can delete
            })
        } catch (error) {
            console.log(error);
        }

    }

    
    return (
        <div>
            <h1>Reviews</h1> 
            <input type="text" value={reviewBody} onChange={updateReviewBody}></input>
            <button onClick= {addReview}>Submit</button>
            {reviews.slice().reverse().map((review, index) => (
                <div key={index} className="review">
                    <h4>Reviewer: {review.author.username}</h4>
                    <p>Review: {review.body}</p>
                    <p>Rating: {review.rating}</p>
                    { (user && (review.author == user._id)) ? 
                        <ButtonGreen onClick={deleteReview}/> : null }
                </div>
            ))}         
        </div>
    )
}

export default Reviews;