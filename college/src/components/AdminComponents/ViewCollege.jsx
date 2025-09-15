import { React, useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBContainer,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn
} from "mdb-react-ui-kit";
import{NavLink} from "react-router-dom";
import "./ViewCollege.css";
import Axios from "axios";

const ViewCollege = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionData = sessionStorage.getItem("admin");
    if (!sessionData) {
      navigate("/admin"); // or any other route you want to redirect to
    }
  }, [navigate]);
  const [colleges, setColleges] = useState([]);
  const url = "https://marvelous-abundance-production.up.railway.app/College/";

  Axios.get(`${url}get`)
    .then((res) => {
      setColleges(res.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });


    const onHandleDelete=async(e)=>{
      try{
      const delId=e.id;
      const delQuery=`delete/${delId}`;
  const delUrl=`${url}${delQuery}`;
  const geturl = `https://marvelous-abundance-production.up.railway.app/user/getByEmail?email=${e.email}`;
    const resp = await Axios.get(geturl);
    const userId = resp.data[0].id;
    if (userId) {
      // Delete user
      const delUseQuery = `/delete/${userId}`;
      const delUseUrl = `https://marvelous-abundance-production.up.railway.app/user${delUseQuery}`;
      await Axios.delete(delUseUrl);
      await Axios.delete(delUrl);
  alert("College deleted successfully.");
    } else {
      await Axios.delete(delUrl);
  alert("College deleted successfully.");
      console.log("No user found for the user.");
    }
  } catch (error) {
    console.error("Error deleting user or college:", error);
  }
};
    function handleRefresh() {
      window.location.reload();
    }
    const onHandleEdit = (e) => {
      const collegeId = e.id;
      navigate("/AdminHome/edit-college", { state: { id: collegeId } });
    };
  return (
    <div className="view-user">
      <MDBContainer fluid>
        <MDBBreadcrumb className="view-breadcrumb" bold>
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
              College
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <a href="/AdminHome/add-user" className="text-reset">
              <u>View College</u>
            </a>
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <MDBContainer fluid className="heading">
        <h2 className="view-heading">View College</h2>
          <NavLink to="/AdminHome/add-college" className="addbutton">
            Add College
          </NavLink>
        </MDBContainer>
        <table className="table-container">
          <thead>
            <tr>
              <th className="table-header">SLNo.</th>
              <th className="table-header">College Name</th>
              <th className="table-header">First Name</th>
              <th className="table-header">Last Name</th>
              <th className="table-header">Phone Number</th>
              <th className="table-header">Address</th>
              <th className="table-header">City</th>
              <th className="table-header">State</th>
              <th className="table-header">Affiliation</th>
              <th className="table-header">Establishment Year</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college,index) => (
              <tr key={college.id} className="table-row">
                <td>{index+1}</td>
                <td>{college.name}</td>
                <td>{college.firstName}</td>
                <td>{college.lastName}</td>
                <td>{college.phoneNumber}</td>
                <td>{college.address}</td>
                <td>{college.city}</td>
                <td>{college.state}</td>
                <td>{college.affiliation}</td>
                <td>{college.establishmentYear}</td>
                <td>
                  <MDBDropdown className="btn-group">
                    <MDBBtn size="sm" color="success">
                      Action
                    </MDBBtn>
                    <MDBDropdownToggle
                      color="success"
                      outline
                      split
                    ></MDBDropdownToggle>
                    <MDBDropdownMenu>
                       <MDBDropdownItem link onClick={()=>onHandleEdit(college)}>Update College</MDBDropdownItem>
                      <MDBDropdownItem link onClick={()=>onHandleDelete(college)}>Delete College</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MDBContainer>
    </div>
  );
};

export default ViewCollege;
