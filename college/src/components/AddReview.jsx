import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MDBBtn } from "mdb-react-ui-kit";
import Axios from 'axios';

const AddReview = ({ userId, collegeId }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };
    function handleRefresh() {
        window.location.reload();
    }
    const handleSubmit = () => {
        // Prepare the review data
        const currentDate = new Date().toISOString(); // Get current date in ISO string format
        const reviewData = {
            userid: { id: userId },
            collegeid: { id: collegeId },
            reviewDate: currentDate,
            reviews: reviewText,
            rating: rating // Add rating to the review data
        };

        // Send the review data to the server
        Axios.post("https://marvelous-abundance-production.up.railway.app/reviews/add", reviewData)
            .then(response => {
                console.log("Review submitted successfully:", response.data);
                handleRefresh();
                // Handle success, maybe show a success message to the user
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert("Already provided a review on this college");
                } else {
                    console.error("Error submitting review:", error);
                    // Handle other errors, maybe show a generic error message to the user
                }
            });
    };

    console.log("userId:", userId);
    console.log("collegeId:", collegeId);

    return (
        <div>
            <h1>Add Your Review for this college</h1>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        size={24}
                        color={rating >= star ? '#ffc107' : '#ccc'}
                        onClick={() => handleRatingChange(star)}
                    />
                ))}
            </div>
            <div className="review">
                <textarea
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={handleReviewChange}
                />
            </div>
            <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            {/* <button type="submit" onClick={handleSubmit}>Submit Review</button> */}
        </div>
    );
};

export default AddReview;
