import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import './StudentLogin.css';

function Login() {
  const navigate = useNavigate();
  const url="https://marvelous-abundance-production.up.railway.app/login";
  const[data,setData]=useState({
  userName:"",
  password:"",
})
function handle(e){
  const newData={...data}
  newData[e.target.id]=e.target.value
  setData(newData)
}
function submit(e){
  e.preventDefault();
  Axios.post(url,{
    userName:data.userName,
    password:data.password
  }).then((res)=>{
    if(res.data==true){
      sessionStorage.setItem("email",data.userName);
      console.log(res.data);
      navigate("/");
    }
    else{
      alert("Email address is incorrect or the password is incorrect...");
    }
  })
  .catch(error => {
    if (error.response) {
      if (error.response.status === 500) {
        alert("Account does not exist...");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } else {
      console.error("Error submitting login:", error);
      alert("An unexpected error occurred. Please check your network connection and try again.");
    }
  });
}

  return (
    <>
    <form onSubmit={(e)=>submit(e)} >
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm='6'>
            <div className='d-flex flex-row ps-5 pt-5'>
              <MDBIcon fas icon="book-open" size='3x' style={{ color: '#709085' }} />
              <span className="h1 fw-bold mb-0">Unifind.in</span>
            </div>

            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
              <h3 className="fw-large mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in to Continue</h3>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='userName' type='email' size="lg" onChange={(e)=>handle(e)} value={data.userName} required />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='password' type='password' size="lg" onChange={(e)=>handle(e)} value={data.password} required />

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color='primary' size='lg'>Login</MDBBtn>
              <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
              <p className='ms-5'>Don't have an account? <a href="/Register" className="link-primary">Register here for Students</a><br/>If you want to join as College User!  <a href="/College-register" className="link-primary">Register here</a></p>
            </div>
          </MDBCol>

          <MDBCol sm='6' className='d-none d-sm-block px-0'>
            <img src="https://img.buzzfeed.com/buzzfeed-static/complex/images/depg0oqo1inie9ifcg3d/most-beautiful-college-campuses-title.jpg?output-format=jpg&output-quality=auto" width={486} height={729}
              alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </form>
    </>
  );
}

export default Login;
