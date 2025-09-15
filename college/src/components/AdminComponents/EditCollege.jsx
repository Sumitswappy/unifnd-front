import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import './AddCollege.css';
import { NavLink } from 'react-router-dom';

const EditCollege = () => {
  const navigate = useNavigate();
  const url = "https://marvelous-abundance-production.up.railway.app/College/";
  const location = useLocation();
  const [college, setCollege] = useState({});
  const colId = college.id;
  const putQuery=`update/${colId}`;
  const fullurl=`${url}${putQuery}`;
  useEffect(() => {
    const sessionData = sessionStorage.getItem("admin");
    if (!sessionData) {
      navigate("/admin"); // or any other route you want to redirect to
    }
  }, [navigate]);
  
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({
    firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            phone: '',
            email: '',
            password: '',
            isAdmin: '',
        isCollegeUser: '',
        photofile: '',
        profilephotoUri: '', 
  });
  const [collegeData, setCollegeData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    email: "",
    password: "",
    affiliation: "",
    certification: "",
    establishmentYear: "",
    collegeCourses: [],
    brochurefileUri: "",
    filename: "",
    collegeweb: "",
    applyweb: "",
    profilephoto: "",
    profilephotoUri: "",
    coverphoto: "",
    coverphotoUri: "",

  });
  const [course, setCourse] = useState([]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get("https://marvelous-abundance-production.up.railway.app/courses/get");
        setCourse(response.data.map((course) => course.course));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  
    if (location.state && location.state.id) {
      const colId = location.state.id;
      console.log(colId);
      
      const getQuery=`get/${location.state.id}`;
      
      Axios.get(`${url}${getQuery}`).then((res) => {

        setCollege(res.data);
        setCollegeData({
          ...res.data,
          collegeCourses: res.data.collegeCourses.map(course => ({ id: course.id }))
        });
        console.log("college",res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
    console.log(collegeData.email);
    
  }, [location]);
  
  useEffect(() => {
    // Check if brochurefileUri and filename are not empty
    if (collegeData.brochurefileUri !== "" && collegeData.filename !== "") {
      console.log("File uploaded successfully:", collegeData.brochurefileUri);
      console.log("Filename:", collegeData.filename);

      // Continue with form submission
      
        console.log("Start:", collegeData);
      
        const geturl = `https://marvelous-abundance-production.up.railway.app/user/getByEmail?email=${collegeData.email}`;
        Axios.get(geturl)
        .then((resp) => {
          console.log("userid:", resp.data);
          setUser(resp.data);
          const userIdFromResponse = resp.data[0].id;
          setUserId(userIdFromResponse); // Update userId inside the .then() block
          console.log("id2:", userIdFromResponse); // Now this should give the updated value
          // Perform subsequent actions that depend on userId here
          const endpointUrl = `https://marvelous-abundance-production.up.railway.app/user/update/${userIdFromResponse}`;
          Axios.put(endpointUrl, {
            firstName: collegeData.firstName,
            lastName: collegeData.lastName,
            address: user.address,
            city: collegeData.city,
            state: collegeData.state,
            phone: collegeData.phoneNumber,
            email: collegeData.email,
            password: '',
            isAdmin: user.isAdmin,
        isCollegeUser: true,
        photofile: user.photofile,
        profilephotoUri: user.profilephotoUri,
          }).then((res) => {
            console.log(res.data); 
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [collegeData],[user]);
 
  const [errors, setErrors] = useState({});

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleCourseChange = (index, value) => {
    setCollegeData((prevData) => {
      const updatedCourses = [...prevData.collegeCourses];
  
      // If value is undefined, uncheck the course and remove it from collegeCourses
      if (value === undefined) {
        const filteredCourses = updatedCourses.filter((course, idx) => idx !== index);
        return { ...prevData, collegeCourses: filteredCourses };
      }
  
      // Check the course and add/update it in collegeCourses
      updatedCourses[index] = { id: value };
      return { ...prevData, collegeCourses: updatedCourses };
    });
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`course${index}`]: "", // Reset error for the specific course index
      collegeCourses: "", // Reset any generic collegeCourses error
    }));
  };
  
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      Axios.put("https://marvelous-abundance-production.up.railway.app/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("File uploaded successfully:", res.data);
        console.log(res.data.fileDownloadUrl);
        console.log("collegedata", collegeData);
  
        // Update collegeData with file information
        const updatedCollegeData = {
          ...collegeData,
          brochurefileUri: res.data.fileDownloadUrl || "", // Store empty string if no file is selected
          filename: res.data.filename || "", // Store empty string if no file is selected
        };
  
        // Set the updated collegeData state
        setCollegeData(updatedCollegeData);
  
        console.log("updated collegeData", updatedCollegeData); // Log the updated collegeData
  
        // Now, make the second Axios PUT request with the updated collegeData
        Axios.put(fullurl, updatedCollegeData)
          .then((res) => {
            console.log("College data updated successfully:", res.data);
            alert("College data updated successfully");
            navigate("/AdminHome/view-college");
          })
          .catch((error) => {
            console.error("Error updating college:", error);
            alert("Error updating college. Please check the console for details.");
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  
    }
    else{
      // Update collegeData with file information
      const updatedCollegeData = {
        ...collegeData,
        brochurefileUri: "", // Store empty string if no file is selected
        filename:  "", // Store empty string if no file is selected
      };

      // Set the updated collegeData state
      setCollegeData(updatedCollegeData);

      console.log("updated collegeData", updatedCollegeData); // Log the updated collegeData

      // Now, make the second Axios PUT request with the updated collegeData
      Axios.put(fullurl, updatedCollegeData)
        .then((res) => {
          console.log("College data updated successfully:", res.data);
          alert("College data updated successfully");
          navigate("/AdminHome/view-college");
        })
        .catch((error) => {
          console.error("Error updating college:", error);
          alert("Error updating college. Please check the console for details.");
        });
    
  
    }
  };
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCollegeData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div className="add-user">
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
                College
              </a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="/AdminHome/add-user" className="text-reset">
                <u>Edit College</u>
              </a>
            </MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <MDBContainer fluid className="heading">
          <h2 className="view-heading">Edit College</h2>
          <NavLink to="/AdminHome/view-college" className="addbutton">
            View College
          </NavLink>
        </MDBContainer>
        <MDBCol>
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <form onSubmit={handleSubmit}>
              <hr/><h4><u>College Details:</u></h4><br/>
              <MDBRow>
                  <MDBCol md="">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Name of College"
                      size="lg"
                      id="name"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.name}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Affiliation"
                      size="lg"
                      id="affiliation"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.affiliation}
                    />
                    {errors.affiliation && (
                      <div className="text-danger">{errors.affiliation}</div>
                    )}
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                <MDBCol md="4">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Address"
                      size="lg"
                      id="address"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.address}
                    />
                    {errors.address && (
                      <div className="text-danger">{errors.address}</div>
                    )}
                  </MDBCol>
                  <MDBCol md="4">
                    <select
                      className="custom-select"
                      id="state"
                      onChange={handleChange}
                      value={collegeData.state}
                    >
                      <option value="">Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <div className="text-danger">{errors.state}</div>
                    )}
                  </MDBCol>

                  <MDBCol md="4">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Select City"
                      size="lg"
                      id="city"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.city}
                    />
                    {errors.city && (
                      <div className="text-danger">{errors.city}</div>
                    )}
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Certification"
                      size="lg"
                      id="certification"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.certification}
                    />
                    {errors.certification && (
                      <div className="text-danger">{errors.certification}</div>
                    )}
                  </MDBCol>
                
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Year of Establishment"
                      size="lg"
                      id="establishmentYear"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.establishmentYear}
                    />
                    {errors.establishmentYear && (
                      <div className="text-danger">
                        {errors.establishmentYear}
                      </div>
                    )}
                  </MDBCol>
                  </MDBRow>
                  <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="College Website URL"
                      size="lg"
                      id="collegeweb"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.collegeweb}
                      required
                    />
                    {errors.collegeweb && (
                      <div className="text-danger">{errors.collegeweb}</div>
                    )}
                  </MDBCol>
                
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Admission Portal URL,if any or else add the same URL"
                      size="lg"
                      id="applyweb"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.applyweb}
                      required
                    />
                    {errors.applyweb && (
                      <div className="text-danger">
                        {errors.applyweb}
                      </div>
                    )}
                  </MDBCol></MDBRow>
                  <MDBRow>
                  <MDBCol md="">
                    <MDBDropdown>
                      <MDBDropdownToggle tag="a">
                        Select Courses
                      </MDBDropdownToggle>
                      <MDBDropdownMenu
                        style={{ overflow: "auto", maxHeight: "160px" }}
                      >
                        {course.map((courseName, index) => (
  <div key={index} className="custom-control custom-checkbox">
    <input
      type="checkbox"
      className="custom-control-input"
      id={`courseCheckbox${index}`}
      checked={collegeData.collegeCourses.some(
        (course) => course?.id === index + 1
      )}
      onChange={() =>
        handleCourseChange(
          index,
          collegeData.collegeCourses.some((course) => course?.id === index + 1)
            ? undefined
            : index + 1
        )
      }
    />
    <label
      className="custom-control-label"
      htmlFor={`courseCheckbox${index}`}
    >
      {courseName}
    </label>
    {errors.collegeCourses && errors.collegeCourses[index] && (
      <div className="text-danger">{errors.collegeCourses[index]}</div>
    )}
  </div>
))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBCol>
                  <MDBCol md="6">
                    <label className="form-label" htmlFor="brochureFile">
                      College Brochure (PDF):{collegeData.filename}
                    </label>
                    <input
                      className="form-control mb-4"
                      type="file"
                      id="brochureFile"
                      onChange={handleFileChange}
                      accept=".pdf"
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    {errors.collegeCourses && (
                      <div className="text-danger">{errors.collegeCourses}</div>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr/>
<h4><u>Contact Person Detail:</u></h4><br/>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First Name:"
                      size="lg"
                      id="firstName"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.firstName}
                    />
                    {errors.contactName && (
                      <div className="text-danger">{errors.firstName}</div>
                    )}
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last Name:"
                      size="lg"
                      id="lastName"
                      type="text"
                      onChange={handleChange}
                      value={collegeData.lastName}
                    />
                    {errors.lastName && (
                      <div className="text-danger">{errors.lastName}</div>
                    )}
                  </MDBCol></MDBRow>
                <div style={{ float: 'left' }}>
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
                    style={{ marginLeft: '10px' }}
                    color="danger"
                    size="md"
                    type="reset"
                    value="reset"
                    onClick={handleRefresh}
                  >
                    Reset
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    </div>
  );
};

export default EditCollege;
