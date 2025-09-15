import React, { useState } from 'react';
import { MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse,MDBAccordion, MDBAccordionItem, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import './SideBarFilters.css';

const SidebarFilters = ({ onFilterChange }) => {
  const cities = [
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

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
  ];
  
  const [filters, setFilters] = useState({
    city: '',
    course: '',
    state: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    // Call the parent component's callback with the selected filters
    onFilterChange(filters);
  };

  const handleCheckboxChange = (name, value) => {
    if (filters[name] === value) {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: '' }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };
  const [openNavSecond, setOpenNavSecond] = useState(false);
  return (
    <div className="sidebar">
      
      <MDBAccordion alwaysOpen>
        <MDBAccordionItem collapseId={1} headerTitle='City'>
          <div className="accordion-scroll">
            {cities.map((city, index) => (
              <div key={index}>
                <MDBCheckbox
                  id={`cityCheckbox_${index}`}
                  label={city}
                  checked={filters.city === city}
                  onChange={() => handleCheckboxChange('city', city)}
                /><br />
              </div>
            ))}
          </div>
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={2} headerTitle='State'>
          <div className="accordion-scroll">
            {states.map((state, index) => (
              <div key={index}>
                <MDBCheckbox
                  id={`stateCheckbox_${index}`}
                  label={state}
                  checked={filters.state === state}
                  onChange={() => handleCheckboxChange('state', state)}
                />
                <br />
              </div>
            ))}
          </div>
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={3} headerTitle='Courses'>
          <div className="accordion-scroll">
            {Object.entries(courses).map(([course, value], index) => (
              <div key={index}>
                <MDBCheckbox
                  id={`courseCheckbox_${index}`}
                  label={course}
                  checked={filters.course === value.toString()}
                  onChange={() => handleCheckboxChange('course', value.toString())}
                />
                <br />
              </div>
            ))}
          </div>
        </MDBAccordionItem>
      </MDBAccordion>
      <MDBBtn className='m-2' onClick={applyFilters}>
        Apply Filters
      </MDBBtn>
    </div>
  );
};

export default SidebarFilters;
