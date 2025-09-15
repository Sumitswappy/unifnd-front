import React, {useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
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
import "./AddUser.css";
import { NavLink } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const url = "https://marvelous-abundance-production.up.railway.app/user/add";
  useEffect(() => {
    const sessionData = sessionStorage.getItem("admin");
    if (!sessionData) {
      navigate("/admin"); // or any other route you want to redirect to
    }
  }, [navigate]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    password: "",
    isAdmin: false,
    isCollegeUser: false,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  function handle(e) {
    const newData = { ...data };
    if (e.target.type === "checkbox") {
      newData[e.target.id] = e.target.checked; // Store boolean value for isAdmin
    } else {
      newData[e.target.id] = e.target.value;
    }
    setData(newData);
  }

  function validateForm() {
    let valid = true;
    const newErrors = { ...errors };

    if (!data.firstName.trim()) {
      newErrors.firstName = "*First Name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "*Last Name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!data.email.trim()) {
      newErrors.email = "*Email is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      } else {
        newErrors.email = "";
      }
    }

    if (!data.phone.trim()) {
      newErrors.phone = "*Phone number is required";
      valid = false;
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(data.phone)) {
        newErrors.phone = "*Invalid phone number format";
        valid = false;
      } else {
        newErrors.phone = "";
      }
    }
    if (!data.address.trim()) {
      newErrors.address = "*Address is required";
      valid = false;
    } else {
      newErrors.address = "";
    }

    if (!data.city.trim()) {
      newErrors.city = "*City is required";
      valid = false;
    } else {
      newErrors.city = "";
    }

    if (!data.state.trim()) {
      newErrors.state = "*State is required";
      valid = false;
    } else {
      newErrors.state = "";
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
        isAdmin: data.isAdmin,
        isCollegeUser: data.isCollegeUser,
      }).then((res) => {
        alert("New User Added...");
        console.log(res.data);
        handleRefresh();
        navigate("/AdminHome/add-user");
      });
    }
  }

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div className="add-user">
      <form onSubmit={(e) => submit(e)}>
        <MDBContainer fluid>
          <MDBBreadcrumb className="add-breadcrumb" bold>
            <MDBBreadcrumbItem>
              <a href="/" className="text-reset">
                Home
              </a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="/AdminHome/dashboard" className="text-reset">
                Dashboard
              </a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="" className="text-reset">
                User
              </a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="/AdminHome/add-user" className="text-reset">
                <u>Add User</u>
              </a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <MDBContainer fluid className="heading">
            <h2 className="view-heading">Add User</h2>
            <NavLink to="/AdminHome/view-user" className="addbutton">
              View User
            </NavLink>
          </MDBContainer>
          <MDBCol>
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <MDBRow>
                  <MDBCol col="6">
                  <div className="text-danger">{errors.firstName}</div>
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
                  <div className="text-danger">{errors.lastName}</div>
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
                <div className="text-danger">{errors.email}</div>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="email"
                  type="email"
                  onChange={(e) => handle(e)}
                  value={data.email}
                />
                <div className="text-danger">{errors.phone}</div>
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
                  <div className="text-danger">{errors.city}</div>
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
                  <div className="text-danger">{errors.city}</div>
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
                  <div className="text-danger">{errors.state}</div>
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

                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  onChange={(e) => handle(e)}
                  value={data.password}
                />
                <label>
                 <input
                  id="isAdmin"
                  type="checkbox"
                  onChange={(e) => handle(e)}
                  checked={data.isAdmin}
                />Admin</label>
                  <label>
                 <input
                  id="isCollegeUser"
                  type="checkbox"
                  onChange={(e) => handle(e)}
                  checked={data.isCollegeUser}
                />College User</label>
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

export default AddUser;
