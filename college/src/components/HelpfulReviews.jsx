

import React, { useState, useEffect } from 'react';
import {  MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import './HelpfulReviews.css'; // Import your custom styles
import Axios from 'axios';

const HelpfulReviews = ({ collegeId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] =useState(0.0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch reviews data when the component mounts
    Axios.get(`https://marvelous-abundance-production.up.railway.app/reviews/college/${collegeId}`)
      .then(response => {
        console.log("Fetched reviews data:", response.data);
        const sortedReviews = response.data.sort((a, b) => b.rating - a.rating);
        setReviews(sortedReviews);
      })
      .catch(error => {
        console.error('Error fetching reviews data:', error);
      });
  
    Axios.get(`https://marvelous-abundance-production.up.railway.app/reviews/get-rating/${collegeId}`)
      .then(res => {
        console.log("rating:", res.data);
        // Use the updated rating directly from res.data in the Axios.put call
        Axios.put(`https://marvelous-abundance-production.up.railway.app/College/update/rating/${collegeId}`, {
          rating: res.data
        })
        .then(response => {
          console.log("Rating updated", response.data);
        })
        .catch(error => {
          console.error('Error updating Rating:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching rating:', error);
      });
  
  }, [collegeId]);
   // Fetch data when collegeId changes
console.log("rating2:",rating);
  useEffect(() => {
    // Automatically move the carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + reviews.length) % reviews.length);
  };

  const calculateTimeDifference = (reviewDate) => {
    const currentDate = new Date();
    const reviewDateTime = new Date(reviewDate);
    const timeDifference = currentDate - reviewDateTime;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    return daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;
  };
  const renderStars = rating => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star gold-star"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt gold-star"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star gold-star"></i>);
    }

    return stars;
  };

  return (
    <div>
      <h2 className='mb-3 p-4'>Most Helpful Reviews of the Month</h2>
      {reviews.length > 0 && (
        <div className="custom-carousel">
          {reviews.slice(currentIndex, currentIndex + 2).map((review, index) => (
            <MDBCard key={index} className="custom-card-size mb-3">
              <MDBCardBody>
                <h5 className="card-title">{review.firstName} {review.lastName}</h5>
                <p className="card-text">{review.email}</p>
                <p className="card-text">{review.review}</p>
                {/* <p className="card-text">Rating: {review.rating}</p> */}
                <p className="card-text">
                  Rating: {renderStars(review.rating)}
                </p>
                <p className="card-text text-muted">{calculateTimeDifference(review.date)}</p>
                </MDBCardBody>
            </MDBCard>
          ))}
          <div className="d-flex justify-content-between mt-3">
            <button onClick={handlePrev} disabled={reviews.length <= 2}>
              <i className="fas fa-chevron-left"></i> {/* Replace with your desired icon */}
            </button>
            <button onClick={handleNext} disabled={reviews.length <= 2}>
              <i className="fas fa-chevron-right"></i> {/* Replace with your desired icon */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpfulReviews;
