import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { MDBBtn} from 'mdb-react-ui-kit';
import './CustomSearch.css';

export default function CustomSearch() {
 
  const [data, setData] = useState({
    cityName: "",
    courseName: "",
  });
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("email"));
  }, []);
  const handleLocationChange = (e) => {
    setData({ ...data, cityName: e.target.value });
  };
  const handleCourseChange = (e) => {
    setData({ ...data, courseName: e.target.value });
  };

  const handleLocationSearch = (e) => {
    // Perform any additional search/filter logic if needed
    setData({ ...data, cityName: e.target.value });
  };
  const handleButtonClick = () => {
    // Check if both cityName and courseName are present before navigating
    if (data.cityName && data.courseName) {
      navigate("/Colleges", { state: { cityName: data.cityName, courseName: data.courseName } });
    } else {
      // Handle the case where either cityName or courseName is not selected
      alert("Please select both city and course to perform the search.");
    }
  };
  const allLocations = [
    "Agra", "Ahmedabad", "Ahmednagar", "Ajmer", "Aligarh", "Allahabad", "Ambala", "Amravati", "Amritsar",
    "Anand", "Aurangabad", "Bangalore","Bareilly", "Bathinda", "Beed", "Belgaum", "Bhavnagar", "Bhilwara", "Bhopal", "Bhubaneswar",
    "Bidar", "Bijapur", "Bikaner", "Bilaspur", "Calicut", "Chandigarh", "Chennai", "Chirala", "Chittoor", "Cochin", "Cuttack",
    "Davangere", "Dehradun", "Delhi", "Dewas", "Dhanbad", "Dhule", "Durg", "Durgapur", "Eluru", "Erode", "Faridabad",
    "Farrukhabad", "Firozabad", "Gangtok", "Gandhinagar", "Gaya", "Ghaziabad", "Gorakhpur", "Greater Noida",
    "Gulbarga", "Guna", "Guntur", "Gurgaon", "Guwahati", "Haridwar", "Hisar", "Hooghly", "Howrah", "Hubli","Hyderabad", "Ichalkaranji",
    "Imphal", "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jamnagar", "Jamshedpur", "Jammu", "Jhansi", "Jharkhand", "Jodhpur",
    "Junagadh", "Kadapa", "Kakinada", "Kalyan-Dombivli", "Kanpur", "Karimnagar", "Karnal", "Kharagpur", "Kochi", "Kolar", "Kolkata", "Kollam",
    "Kota", "Kozhikode", "Kurnool", "Kurukshetra", "Lucknow", "Ludhiana", "Madhya Pradesh", "Madurai", "Maharashtra", "Malappuram",
    "Manipal", "Mangalore", "Mathura", "Meerut", "Moradabad", "Mumbai", "Muzaffarnagar", "Muzaffarpur", "Mysore", "Nagpur",
    "Naihati", "Nanded", "Nashik", "Navi Mumbai", "Nellore", "Nizamabad", "Noida", "Odisha", "Ozhukarai", "Palakkad",
    "Panchkula", "Panipat", "Panaji", "Patna", "Patiala", "Proddatur", "Puducherry", "Pune", "Raipur", "Rajahmundry", "Rajkot",
    "Rampur", "Ranchi", "Ratlam", "Rewa", "Roorkee", "Rourkela", "Sagar", "Saharanpur", "Salem", "Sangli", "Satara", "Satna",
    "Secunderabad", "Shillong", "Shimla", "Shimoga", "Siliguri", "Solan", "Solapur", "Sonipat", "Srinagar", "Srikakulam",
    "Surat", "Thane", "Thanjavur", "Thiruvananthapuram", "Thrissur", "Tiruchengode","Tiruchirappalli", "Tirunelveli", "Tirupathi", "Tirupur",
    "Udaipur", "Ujjain", "Ulhasnagar", "Uran", "Vadodara", "Varanasi" , "Vasai", "Vellore", "Vijayawada", "Vijayanagaram", "Visakhapatnam",
    "Vizianagaram", "Warangal", "Wardha", "Yamuna Nagar"
  ];


  const courses = ["Engineering (B.Tech/B.E)", "Medical (MBBS)", "Dentistry (BDS)", "Pharmacy (B.Pharm/M.Pharm)",
    "Nursing (B.Sc Nursing/M.Sc Nursing)", "Architecture (B.Arch/M.Arch)", "Business Administration (BBA/MBA)",
    "Commerce (B.Com/M.Com)", "Science (B.Sc/M.Sc)", "Computer Applications (BCA/MCA)", "Law (LLB/LLM)",
    "Education/Teaching (B.Ed/M.Ed)", "Journalism/Mass Communication", "Design (B.Des/M.Des)", "Hotel Management",
    "Animation/Multimedia", "Fine Arts", "Diploma Courses", "Agriculture (B.Sc Agriculture)", "Forestry",
    "Library Science", "Performing Arts (Music/Dance/Drama)", "Physical Education", "Fashion Designing",
    "Film/Television Production", "Food Technology", "Interior Designing", "Travel and Tourism", "Event Management",
    "Medical Laboratory Technology", "Psychology (BA/B.Sc Psychology)", "Sociology (BA/B.Sc Sociology)",
    "Economics (BA/B.Sc Economics)", "Geography (BA/B.Sc Geography)", "History (BA History)",
    "Political Science (BA/B.Sc Political Science)", "Languages (BA Literature/Linguistics)"];
    const filteredLocations = allLocations.filter((location) =>
    location.toLowerCase().includes(data.cityName.toLowerCase())
  );

  return (
    <form >
      <div className={`search-bar ${isLoggedIn ? 'logged-in' : 'logged-out'}`}>
        <div className="custom-select-container">
          <input
            type="text"
            placeholder="Search City..."
            className="custom-search-input"
            value={data.cityName}
            onChange={handleLocationSearch}
          />
        </div>
        <select className="custom-select" onChange={handleLocationChange} value={data.cityName} required>
        <option value="">Select City</option>
        {filteredLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select className="custom-select" onChange={handleCourseChange} value={data.courseName} required>
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <MDBBtn className='search'outline rounded color='light' type="submit" onClick={()=>handleButtonClick(data)} >
          Search
        </MDBBtn>
      </div>
    </form>
  );
}