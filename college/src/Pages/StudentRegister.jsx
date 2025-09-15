import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import './StudentRegister.css';

function Register() {
  const navigate = useNavigate();
  const url = "https://marvelous-abundance-production.up.railway.app/user/add";
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState([]);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.id]: '', // Clear the error message when the user starts typing
    }));
    
    if (e.target.id === 'password') {
      evaluatePasswordStrength(e.target.value);
    }
  }

  function evaluatePasswordStrength(password) {
    let strength = '';
    const feedback = [];

    if (password.length < 8) {
      strength = 'Too Short';
      feedback.push('Password must be at least 8 characters long.');
    } else {
      if (!/[A-Z]/.test(password)) {
        feedback.push('Password should include at least one uppercase letter.');
      }
      if (!/[a-z]/.test(password)) {
        feedback.push('Password should include at least one lowercase letter.');
      }
      if (!/\d/.test(password)) {
        feedback.push('Password should include at least one number.');
      }
      if (!/[!@#$%^&*]/.test(password)) {
        feedback.push('Password should include at least one special character.');
      }

      if (feedback.length === 0) {
        strength = 'Strong';
      } else if (feedback.length <= 2) {
        strength = 'Medium';
      } else {
        strength = 'Weak';
      }
    }

    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  }

  function validateForm() {
    let valid = true;
    const newErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = '*First name is required';
      valid = false;
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = '*Last name is required';
      valid = false;
    }

    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email.trim())) {
      newErrors.email = '*Valid email address is required';
      valid = false;
    }

    if (!data.phone.trim()) {
      newErrors.phone = '*Phone number is required';
      valid = false;
    }

    if (!/^\d{10}$/.test(data.phone.trim())) {
      newErrors.phone = '*Phone number should be 10 digits';
      valid = false;
    }
    
    if (!data.address.trim()) {
      newErrors.address = '*Address is required';
      valid = false;
    }

    if (!data.city.trim()) {
      newErrors.city = '*City is required';
      valid = false;
    }

    if (!data.state.trim()) {
      newErrors.state = '*State is required';
      valid = false;
    }

    if (!data.password.trim()) {
      newErrors.password = '*Password is required';
      valid = false;
    }

    if (!/^.{8,}$/.test(data.password.trim())) {
      newErrors.password = '*Password must be at least 8 characters';
      valid = false;
    }

    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = '*Confirm your password';
      valid = false;
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = '*Password and confirm password do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function submit(e) {
    e.preventDefault();

    if (validateForm()) {
      Axios.post(url, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        email: data.email,
        password: data.password,
        isAdmin: false,
        isCollegeUser: false,
      })
        .then(res => {
          console.log(res.data);
          navigate('/Login');
        });
    }
  }

  return (
    <form onSubmit={(e) => submit(e)}>
      <MDBContainer fluid className='p-4'>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              Explore Your Future in Education <br />
              <span className="text-primary">with Unifind.in</span>
            </h1>
            <div className='px'>
              <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Welcome to Unifind.in - your gateway to a world of educational opportunities! 🎓 Whether you're planning your academic journey or looking to enhance your skills, we've got you covered. Register with us to unlock a host of features and benefits:
              </p>
              <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                - Discover Diverse Colleges: Explore a wide range of colleges across different cities and courses.
              </p>
              <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                - Personalized Recommendations: Receive tailored suggestions based on your interests and preferences.
              </p>
              <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                - Stay Informed: Get the latest updates on admission deadlines, courses, and more.
              </p>
              <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                - Connect with Peers: Join a community of like-minded individuals and share insights.
              </p>
              <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Your future begins here! Register now and embark on a journey towards academic excellence. 🚀
              </p>
            </div>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCard className='my-5'>
              <MDBCardBody className='p-5'>
                <MDBRow>
                  <MDBCol col='6'>
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    <MDBInput
                      wrapperClass='mb-4'
                      label='First name'
                      id='firstName'
                      type='text'
                      onChange={(e) => handle(e)}
                      value={data.firstName}
                    />
                  </MDBCol>

                  <MDBCol col='6'>
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Last name'
                      id='lastName'
                      type='text'
                      onChange={(e) => handle(e)}
                      value={data.lastName}
                    />
                  </MDBCol>
                </MDBRow>
                {errors.email && <div className="text-danger">{errors.email}</div>}
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email'
                  id='email'
                  type='email'
                  onChange={(e) => handle(e)}
                  value={data.email}
                />

                {errors.phone && <div className="text-danger">{errors.phone}</div>}
                <MDBInput
                  wrapperClass='mb-4'
                  label='Mobile No.'
                  id='phone'
                  type='text'
                  onChange={(e) => handle(e)}
                  value={data.phone}
                />

                <MDBRow>
                  <MDBCol col='4'>
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Address'
                      id='address'
                      type='text'
                      onChange={(e) => handle(e)}
                      value={data.address}
                    />
                  </MDBCol>
                  <MDBCol col='4'>
                    {errors.city && <div className="text-danger">{errors.city}</div>}
                    <MDBInput
                      wrapperClass='mb-4'
                      label='City'
                      id='city'
                      type='text'
                      onChange={(e) => handle(e)}
                      value={data.city}
                    />
                  </MDBCol>

                  <MDBCol col='4'>
                    {errors.state && <div className="text-danger">{errors.state}</div>}
                    <MDBInput
                      wrapperClass='mb-4'
                      label='State'
                      id='state'
                      type='text'
                      onChange={(e) => handle(e)}
                      value={data.state}
                    />
                  </MDBCol>
                </MDBRow>
                {errors.password && <div className="text-danger">{errors.password}</div>}
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  type='password'
                  onChange={(e) => handle(e)}
                  value={data.password}
                />
                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                  {passwordStrength && <span>Password Strength: {passwordStrength}</span>}
                </div>
                <ul className="password-feedback">
                  {passwordFeedback.map((item, index) => (
                    <li key={index} className="text-danger">{item}</li>
                  ))}
                </ul>

                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                <MDBInput
                  wrapperClass='mb-4'
                  label='Confirm Password'
                  id='confirmPassword'
                  type='password'
                  onChange={(e) => handle(e)}
                  value={data.confirmPassword}
                />

                <MDBBtn className='w-100 mb-4' color='primary' size='md' type='submit' value="Submit">Register Now</MDBBtn>

                <div className="text-center">
                  <p className='ms-5'>Already have an account? <a href="/Login" className="link-primary">Click to Log In</a></p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}

export default Register;
