
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBInputGroup,
  MDBBtn,
  MDBCardImage,
  MDBNavbarBrand,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem
} from 'mdb-react-ui-kit';
import './Navbar.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate=useNavigate();
  const [showDashboard, setShowDashboard] = useState(false);
  const [username, setUsername]= useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin]= useState(false);
  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("email"));
    setShowDashboard(!!sessionStorage.getItem("admin"));

    const fetchData = async () => {
      try {
        const url = `https://marvelous-abundance-production.up.railway.app/user/getByEmail?email=${sessionStorage.getItem("email")}`;
        const res = await Axios.get(url);
        sessionStorage.setItem("name", res.data[0].firstName);
        sessionStorage.setItem("id",res.data[0].id);
        sessionStorage.setItem("photoUrl",res.data[0].profilephotoUri);
        sessionStorage.setItem("isCollegeUser",res.data[0].isCollegeUser);
        setUsername(res.data[0].id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const courses = {"Medical (MBBS)":2, "Dentistry (BDS)":3, "Pharmacy (B.Pharm/M.Pharm)":4,"Nursing (B.Sc Nursing/M.Sc Nursing)":5,"Computer Applications (BCA/MCA)":10, "Law (LLB/LLM)":11,
    "Education/Teaching (B.Ed/M.Ed)":12, "Journalism/Mass Communication":13, "Design (B.Des/M.Des)":14, "Hotel Management":15,
    "Animation/Multimedia":16, "Fine Arts":17};
  const handleLogOut = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("admin");
    navigate("/");
handleRefresh();
    
  };
  const handleDashboard = () => {
    navigate("/AdminHome/dashboard");
  }
  const handleCourse = (e, event) => {
    event.preventDefault();
    const courseIndex = courses[e];
    navigate("/Colleges", { state: { courseName: courseIndex } });
  }
    
  function handleRefresh() {
    window.location.reload();
  }
  const onHandleEdit = (userId, event) => {
    event.preventDefault(); // Prevent default behavior of anchor tag
    navigate("/userprofile", { state: { id: userId } });
  };
  const [openNavColor, setOpenNavColor] = useState(false);

  return (
    <MDBNavbar id="navbar-0" fixed='top' expand='lg' dark className={`p-3 mb-2 ${isLoggedIn ? 'bg-primary bg-gradient' : 'bg-dark bg-gradient'}`}>
      <MDBContainer fluid>
        <MDBIcon fas icon="book-open" size='2x' style={{ color: isLoggedIn ? '#4d4d4d' : '#666565', paddingRight: '5px' }} />
        <MDBNavbarBrand href='/'>Unifind.in</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavColor(!openNavColor)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse open={openNavColor} navbar>
          <MDBNavbarNav className='me-auto mb-2 lg-3'>
            
            
            
            <MDBDropdown group className='ms-2'>
              <MDBDropdownToggle outline rounded color={isLoggedIn ? 'light' : 'warning'} className='nav-button-1' ><MDBIcon fas icon="graduation-cap" size='lg'/> Courses</MDBDropdownToggle>
              <MDBDropdownMenu dark>
                {Object.keys(courses).map((course, index) => (
                  <MDBDropdownItem link key={index} onClick={(event) => handleCourse(course, event)}>
                    {course}
                  </MDBDropdownItem>
                ))}
              </MDBDropdownMenu>
            </MDBDropdown>
            
            
           
            {/* <MDBNavbarItem className='ms-2'>
              <MDBNavbarLink href='#'>Review</MDBNavbarLink>
            </MDBNavbarItem> */}
          </MDBNavbarNav>
          {isLoggedIn ? (
        <MDBDropdown id="logout-navbar" group className="logout-dropdown">
          <MDBDropdownToggle outline rounded color='light' className='nav-button-3'> {/*<MDBIcon fas icon="user-graduate" size='lg' />*/}<MDBCardImage
                    src={sessionStorage.getItem("photoUrl")}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '25px', height: '25px' }}
                    fluid /> Hi, {sessionStorage.getItem("name")} </MDBDropdownToggle>
          <MDBDropdownMenu dark>
          <MDBDropdownItem link tag='a' onClick={(event) => onHandleEdit(username, event)}>Profile</MDBDropdownItem>
            <MDBDropdownItem link tag='a' style={{ display: showDashboard ? 'block' : 'none' }} onClick={handleDashboard}>Dashboard</MDBDropdownItem>
            <MDBDropdownItem link tag='a' onClick={handleLogOut}>Log out</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      ) : (
        <MDBDropdown id="login-navbar" group className="login-register-dropdown">
          <MDBDropdownToggle outline rounded color='danger' className='nav-button-2'><MDBIcon fas icon="user-graduate" size='lg' /> Login/SignUp</MDBDropdownToggle>
          <MDBDropdownMenu dark>
            <MDBDropdownItem link href='/Login'>User Login</MDBDropdownItem>
            <MDBDropdownItem link href='/Register'> Sign Up as Student</MDBDropdownItem>
           {/* <MDBDropdownItem link href='/Collegelogin'>Login for College</MDBDropdownItem>*/}
            <MDBDropdownItem link href='/College-register'>Sign up for College </MDBDropdownItem>
            {/* <MDBDropdownItem link href='/admin'>Login for Admins</MDBDropdownItem> */}
          </MDBDropdownMenu>
        </MDBDropdown>
      )}
   
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    
  );
}