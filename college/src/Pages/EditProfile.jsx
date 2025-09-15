import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";
import "./EditProfile.css"; 
import { NavLink } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionData = sessionStorage.getItem("email");
    if (!sessionData) {
      navigate("/Login"); 
    }
  }, [navigate]);
  const [password, setPassword] = useState('');
  const url = "https://marvelous-abundance-production.up.railway.app/user/";
  const location = useLocation();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    password: null, // Initially set to null
    isAdmin: false,
    isCollegeUser: false,
  });

  const [users, setUsers] = useState([]);
  const [col, setCol] = useState([]);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // Track if password field has been changed

  useEffect(() => {
    if (location.state && location.state.id) {
      const userId = location.state.id;
      const getQuery = `get/${userId}`;
      Axios.get(`${url}${getQuery}`).then((res) => {
        setUsers(res.data);
        // Set password only if it exists
        setPassword(res.data.password || '');
        setData(res.data);
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [location]);

  useEffect(() => {
    const geturl = `https://marvelous-abundance-production.up.railway.app/College/getByEmail?email=${data.email}`;
    Axios.get(geturl)
    .then((resp) => {
      setCol(resp.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  });

  function handle(e) {
    const newData = { ...data };
    if (e.target.type === "checkbox") {
      newData[e.target.id] = e.target.checked;
    } else {
      newData[e.target.id] = e.target.value;
      if (e.target.id === "password") {
        setIsPasswordChanged(true);
        setPassword(e.target.value); // Update password state separately
      }
    }
    setData(newData);
  }
  const submit = (e) => {
    e.preventDefault();
    const userId = users.id;
    const putQuery = `update/${userId}`;
    const fullurl = `${url}${putQuery}`;
    
    if (isPasswordChanged || data.isCollegeUser) {
      // Only update password if it's changed or if the user is a college user
      console.log("Submitting data with password:", data); // Log the data object before submitting
      Axios.put(fullurl, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        email: data.email,
        password: '',
        isAdmin: data.isAdmin,
        isCollegeUser: data.isCollegeUser,
        photofile: data.photofile,
        profilephotoUri: data.profilephotoUri,
      }).then((res) => {
        e.preventDefault();
        navigate("/userprofile", { state: { id: userId } });
      });
    } else {
      // Update other fields except for password
      console.log("Submitting data without password:", data); // Log the data object before submitting
      Axios.put(fullurl, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        phone: data.phone,
        email: data.email,
        isAdmin: data.isAdmin,
        password: '',
        isCollegeUser: data.isCollegeUser,
        photofile: data.photofile,
        profilephotoUri: data.profilephotoUri,
      }).then((res) => {
        e.preventDefault();
        navigate("/userprofile", { state: { id: data.id } });
      });
    }
  };
  

  if (!users.id) {
    return (
      <div>
        <p>Error: User ID not available</p>
      </div>
    );
  }

  return (
    <div className="user1">
        <Navbar/>
      <form onSubmit={(e) => submit(e)}>
        <MDBContainer fluid>
          <MDBBreadcrumb className="add-breadcrumb" bold>
            <MDBBreadcrumbItem>
              <a href="/" className="text-reset">
                Home
              </a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
  <a
    href="#"
    className="text-reset"
    onClick={(event) => {
      event.preventDefault();
      navigate("/userprofile", { state: { id: data.id } });
    }}
  >
    User Profile
  </a>
</MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="/editprofile" className="text-reset">
                <u>Edit Profile</u>
              </a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
          {/* <MDBContainer fluid className="heading">
            <h2 className="view-heading">Edit User</h2>
            <NavLink to="/AdminHome/view-user" className="add-user-button">
              View User
            </NavLink>
          </MDBContainer> */}
          <MDBCol>
            <MDBCard className="my-5 fa-container">
              <MDBCardBody className="p-5">
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      id="firstName"
                      type="text"
                      onChange={(e) => handle(e)}
                      value={data.firstName}
                    />
                  </MDBCol>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      id="lastName"
                      type="text"
                      onChange={(e) => handle(e)}
                      value={data.lastName}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="email"
                  type="email"
                  onChange={(e) => handle(e)}
                  value={data.email}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Mobile No."
                  id="phone"
                  type="text"
                  onChange={(e) => handle(e)}
                  value={data.phone}
                />
                <MDBRow>
                <MDBCol col="4">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Address"
                      id="address"
                      type="text"
                      onChange={(e) => handle(e)}
                      value={data.address}
                    />
                  </MDBCol>
                  <MDBCol col="4">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="City"
                      id="city"
                      type="text"
                      onChange={(e) => handle(e)}
                      value={data.city}
                    />
                  </MDBCol>
                  <MDBCol col="4">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="State"
                      id="state"
                      type="text"
                      onChange={(e) => handle(e)}
                      value={data.state}
                    />
                  </MDBCol>
                </MDBRow>
                {/* <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  onChange={(e) => handle(e)}
                  value={data.password}
                /> */}
                {/* <label>
                  <input
                    id="isAdmin"
                    type="checkbox"
                    onChange={(e) => handle(e)}
                    checked={data.isAdmin}
                  />Admin
                </label>
                <label>
                  <input
                    id="isCollegeUser"
                    type="checkbox"
                    onChange={(e) => handle(e)}
                    checked={data.isCollegeUser}
                  />College User
                </label> */}
                <div style={{ float: "left" }}>
                  <MDBBtn
                    className="w-10 mb-4"
                    color="success"
                    size="md"
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </MDBBtn>
                  <MDBBtn
                    className="w-10 mb-4"
                    style={{ marginLeft: "10px" }}
                    color="danger"
                    size="md"
                    type="reset"
                    value="reset"
                  >
                    Reset
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </form>
    </div>
  );
};

export default EditProfile;
