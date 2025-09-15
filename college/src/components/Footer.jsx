import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          {/* Social Media Icons */}
          <MDBBtn outline color="light" floating className='m-1' href='https://www.facebook.com/' target="_blank" role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://twitter.com/' target="_blank" role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.google.com/' target="_blank" role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/' target="_blank" role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/' target="_blank" role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/' target="_blank" role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

        {/* Newsletter Subscription */}
        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2 text-white'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' label='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        {/* About Us Section */}
        <section className='mb-4'>
          <p className='text-white'>
            Welcome to Unifind.in - your gateway to a world of educational opportunities! 🎓 Explore a wide range of colleges, get personalized recommendations, stay informed with the latest updates, and connect with peers. Your future begins here! Register now and embark on a journey towards academic excellence. 🚀
          </p>
        </section>

        {/* Quick Links Section */}
        <section className=''>
        <h5 className='text-uppercase text-white'>Quick Links</h5>
        <ul className='list-unstyled mb-0'>
        <MDBRow>
          
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            
              <li>
                <a href='/' className='text-white'>
                  About Us
                </a>
              </li></MDBCol>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>    
              <li>
                <a href='/' className='text-white'>
                  Terms
                </a>
              </li></MDBCol>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <li>
                <a href='/' className='text-white'>
                  Help
                </a>
              </li>
              </MDBCol>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <li>
                <a href='/' className='text-white'>
                  Contact Us
                </a>
              </li>
            
          </MDBCol>
          {/* Add more sections with additional links as needed */}
        </MDBRow>
        </ul>
          
        </section>
      </MDBContainer>

      {/* Footer Bottom Section */}
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Unifind.in | All Rights Reserved | <a className='text-white' href='https://mdbootstrap.com/' target="_blank" rel="noopener noreferrer">MDBootstrap.com</a>
      </div>
    </MDBFooter>
  );
}
