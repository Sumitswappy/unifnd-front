import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
function AdminLogin() {
  const navigate = useNavigate();
  const url="https://marvelous-abundance-production.up.railway.app/login";
const[data,setData]=useState({
  userName:"",
  password:"",
})
const[admin,setAdmin]=useState();
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
      console.log(res.data);
      const getUrl = `https://marvelous-abundance-production.up.railway.app/user/getByEmail?email=${data.userName}`;
      Axios.get(getUrl).then((res) => {
        if(res.data[0].isAdmin==1){
        sessionStorage.setItem("email",data.userName);
        sessionStorage.setItem("admin",data.userName);
        navigate("/");}
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
      
    }
    else{
      alert("Only admins can login...");
    }
  })
}

  return (
    <form onSubmit={(e)=>submit(e)}>
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Log In for Admins</h2>

          <MDBRow>
            <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Username' id='userName' type='email' onChange={(e)=>handle(e)} value={data.userName} required />
            </MDBCol>

            <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' onChange={(e)=>handle(e)} value={data.password} required />
            </MDBCol>
          </MDBRow>
          <MDBRow>
  <MDBCol>
    <div className="d-flex justify-content-center"> 
      <MDBBtn className="mb-4 px-5 w-100" color="primary" size="lg">Login</MDBBtn>
    </div>
  </MDBCol>
</MDBRow>
          

        </MDBCardBody>
      </MDBCard>

    </MDBContainer></form>
  );
}

export default AdminLogin;
