import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption,MDBBtn } from 'mdb-react-ui-kit';
import CustomSearch from './CustomSearch';
import './Carousel.css';

export default function Carousel() {
  return (
    <div>
      <MDBCarousel showControls light fade>
        <MDBCarouselItem itemId={1}>
          <img src='https://mbadreamcollege.in/wp-content/uploads/Direct-Admission-in-SP-Jain-Mumbai-Management-Quota-Seats.jpeg' className='d-block w-100' alt='...' style={{ maxHeight: '400px' }} width="844" height="400"  />
          <MDBCarouselCaption>
            <h5>S. P. Jain Institute of Management and Research</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src='https://assets.telegraphindia.com/telegraph/2021/Dec/1639305481_iit-kharagpur.jpg' className='d-block w-100' alt='...' style={{ maxHeight: '400px' }} width="844" height="600" />
          <MDBCarouselCaption>
            <h5>IIT Kharagpur</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src='https://kiit.ac.in/wp-content/uploads/2018/07/KIIT-Campus-Front-Library.jpg' className='d-block w-100' alt='...' style={{ maxHeight: '400px' }} width="844" height="600"  />
          <MDBCarouselCaption>
            <h5>KIIT-Kalinga Institute of Industrial Technology</h5>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        
      </MDBCarousel>
      <CustomSearch/>
    </div>
  );
}
