import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import SidebarFilters from "../components/SideBarFilters";
import Navbar from "../components/Navbar.jsx";
import './CollegeList.css';
import UpbarFilters from "../components/Upbarfilters.jsx";
const CollegeList = () => {
  const [filters, setFilters] = useState({
    city: '',
    course: '',
    state: '',
  });

  const navigate = useNavigate();
  const handleFilterChange = (newFilters) => {
    setSearchData({ state: undefined });
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      city: '',
      course: '',
      state: '',
      fees: ''
    });
  };

  useEffect(() => {
    window.onload = resetFilters; // Reset filters when window is reloaded
  }, []);

  const url = "https://marvelous-abundance-production.up.railway.app/College/get-filtered";
  const url2 = "https://marvelous-abundance-production.up.railway.app/College/get";
  const url3= "https://marvelous-abundance-production.up.railway.app/College/get-filtered-state"
  const [searchdata, setSearchData] = useState(useLocation());
  const [collegeDetails, setCollegeDetails] = useState([]);
  const courses = {
    "Engineering (B.Tech/B.E)": 1,
    "Medical (MBBS)": 2,
    "Dentistry (BDS)": 3,
    "Pharmacy (B.Pharm/M.Pharm)": 4,
    "Nursing (B.Sc Nursing/M.Sc Nursing)": 5,
    "Architecture (B.Arch/M.Arch)": 6,
    "Business Administration (BBA/MBA)": 7,
    "Commerce (B.Com/M.Com)": 8,
    "Science (B.Sc/M.Sc)": 9,
    "Computer Applications (BCA/MCA)": 10,
    "Law (LLB/LLM)": 11,
    "Education/Teaching (B.Ed/M.Ed)": 12,
    "Journalism/Mass Communication": 13,
    "Design (B.Des/M.Des)": 14,
    "Hotel Management": 15,
    "Animation/Multimedia": 16,
    "Fine Arts": 17,
    "Diploma Courses": 18,
    "Agriculture (B.Sc Agriculture)": 19,
    "Forestry": 20,
    "Library Science": 21,
    "Performing Arts (Music/Dance/Drama)": 22,
    "Physical Education": 23,
    "Fashion Designing": 24,
    "Film/Television Production": 25,
    "Food Technology": 26,
    "Interior Designing": 27,
    "Travel and Tourism": 28,
    "Event Management": 29,
    "Medical Laboratory Technology": 30,
    "Psychology (BA/B.Sc Psychology)": 31,
    "Sociology (BA/B.Sc Sociology)": 32,
    "Economics (BA/B.Sc Economics)": 33,
    "Geography (BA/B.Sc Geography)": 34,
    "History (BA History)": 35,
    "Political Science (BA/B.Sc Political Science)": 36,
    "Languages (BA Literature/Linguistics)": 37
  };
  useEffect(() => {
    const college = async () => {
      try {
        let response;
        if (!searchdata.state) {
          if (!filters.city && !filters.course && !filters.state) {
            response = await Axios.get(url2);
          }  else if (filters.course && !filters.city && !filters.state) {
            response = await Axios.get(`https://marvelous-abundance-production.up.railway.app/College/byCourse/${filters.course}`);
          } else if (filters.city && !filters.state && !filters.course) {
            response = await Axios.get(`https://marvelous-abundance-production.up.railway.app/College/byCity/${filters.city}`);
          } else if (filters.state && !filters.course && !filters.city) {
            response = await Axios.get(`https://marvelous-abundance-production.up.railway.app/College/byState/${filters.state}`);
          }
          else if (filters.city && filters.course && !filters.state)
            {
              const courseIndexToName = Object.fromEntries(Object.entries(courses).map(([name, index]) => [index, name]));
              const coursename=filters.course? courseIndexToName[filters.course]:'';
              const query = `?city=${filters.city || ''}&course=${coursename || ''}`;
              const fullUrl = `${url}${query}`;
              response = await Axios.get(fullUrl);
              
            }
            else if (!filters.city && filters.course && filters.state)
              {
                const courseIndexToName = Object.fromEntries(Object.entries(courses).map(([name, index]) => [index, name]));
                const coursename=filters.course? courseIndexToName[filters.course]:'';
                const query = `?state=${filters.state || ''}&course=${coursename || ''}`;
                const fullUrl = `${url3}${query}`;
                response = await Axios.get(fullUrl);
                
              }
          else {
            const query = `?city=${filters.city || ''}&course=${filters.course || ''}`;
            const fullUrl = `${url}${query}`;
            response = await Axios.get(fullUrl);
           
          }
        }
        else if(searchdata.state.categoryName){
          response = await Axios.get(`https://marvelous-abundance-production.up.railway.app/categories/college?categoryName=${searchdata.state.categoryName}`);
        }
        else if (searchdata.state.courseName && !searchdata.state.cityName) {
          
          response = await Axios.get(`https://marvelous-abundance-production.up.railway.app/College/byCourse/${searchdata.state.courseName}`);
        }
         else {
          const query = `?city=${searchdata.state.cityName || ''}&course=${searchdata.state.courseName || ''}`;
          const fullUrl = `${url}${query}`;
          response = await Axios.get(fullUrl);
          
        }
        
        setCollegeDetails(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    college();
  }, [searchdata, filters]);

  const onHandle = (college) => {
    if (sessionStorage.getItem("email") != null) {
      
      const collegeId = college.id;
      
      navigate("/CollegesProfile", { state: { id: collegeId } });
    } else {
      navigate("/Login");
      alert("Please Log In...");
    }
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
    <div className='college-body'>
      <MDBContainer className='college-container' fluid>
      <MDBRow>
        <Navbar />
        </MDBRow>
        <div className="upbarfilters">
          <UpbarFilters onFilterChange={handleFilterChange}/>
        </div>
        <MDBRow>
          <MDBCol size='2' md='2' className="sidebar-filters">
            <SidebarFilters onFilterChange={handleFilterChange} />
          </MDBCol>
          <MDBCol size='12' md='10'>
            <MDBContainer className="college-container" style={{ flex: 1, paddingLeft: '20px', marginTop: '75px' }} fluid>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
                {collegeDetails.map((college, index) => (
                  <MDBCard key={index} className="college-card" style={{ width: '75%', margin: '10px' }}>
                    <MDBCardBody style={{ backgroundImage: `url(${college.coverphotoUri})`, backgroundSize: 'cover', borderRadius: '40px' }}>
                      <div style={{ display: "flex", justifyContent: "flex-start",  padding: '20px', background: '#ffffff85',borderRadius: '20px', color: 'black' }}>
                        <img
                          src={college.profilephotoUri}
                          alt={`College ${index + 1}`}
                          style={{ width: '100px', height: '100px', marginRight: '10px', border: "1px solid black" }}
                        />
                        <div>
                          <MDBCardTitle><h4><strong>{college.name}</strong></h4></MDBCardTitle>
                          <MDBCardText className="cardTextStyle">
                            {college.state} <br />
                            {college.city} <br />
                            established in {college.establishmentYear}<br />
                            and {college.certification} Certified<br />
                            <p className="card-text">
                  Rating: {renderStars(college.rating)}
                </p><br/>
                            <button className="btn btn-primary" onClick={() => onHandle(college)}>View Details</button>
                          </MDBCardText>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </div>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CollegeList;
