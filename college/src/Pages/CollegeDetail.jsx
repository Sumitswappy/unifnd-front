
import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import { useParams } from "react-router-dom";
import Axios from "axios";
import HelpfulReviews from '../components/HelpfulReviews';
import AddReview from "../components/AddReview";
import { MDBSpinner, MDBContainer, MDBRow, MDBCol, MDBTabsItem, MDBTabsLink, MDBCard, MDBCardBody,MDBCardImage,MDBIcon,
  MDBTabs, MDBBtn, MDBModal, MDBModalTitle, MDBModalBody, MDBModalContent,
  MDBModalDialog, MDBModalFooter, MDBModalHeader } from "mdb-react-ui-kit";
import { useNavigate,useLocation } from "react-router-dom";
import "./CollegeDetail.css";

const CollegeDetail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionData = sessionStorage.getItem("email");
    if (!sessionData) {
      navigate("/Login"); // or any other route you want to redirect to
    }
  }, [navigate]);
  const { id } = useParams();
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [collegeData, setCollegeData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const url = "https://marvelous-abundance-production.up.railway.app/College/";
  const location = useLocation();
  const [userId, setUserId] = useState(""); // State to store user id
  const [isCollegeUser,setIsCollegeUser]=useState(false);
  const [profilephotoUrl, setProfilephotoUrl] = useState(null);
  const [coverphotoUrl, setCoverphotoUrl] = useState(null);
  const [profilefile, setProfilefile] = useState(null);
  const [coverfile, setCoverfile] = useState(null);
  const [showProfileUploadButton, setShowProfileUploadButton] = useState(false);
  const [showCoverUploadButton, setShowCoverUploadButton] = useState(false);
  
  useEffect(() => {
    if (location.state && location.state.id) {
      const collegeId = location.state.id;
      const getQuery = `get/${collegeId}`;
      Axios.get(`${url}${getQuery}`).then((res) => {
        setCollegeData(res.data);
        console.log(res.data);
      })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })

      setUserId(sessionStorage.getItem("id"));
      setIsCollegeUser(sessionStorage.getItem("isCollegeUser") === "true"); // Convert string to boolean
    }
  }, [location]);

  if (!collegeData) {
    return <MDBSpinner color='primary'>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>;
  }
  const isCurrentUserCollegeUser = isCollegeUser && sessionStorage.getItem("email") === collegeData.email;
  const renderStars = rating => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star goldy-star"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt goldy-star"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star goldy-star"></i>);
    }

    return stars;
  };
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="back">
            
            <p>
              <strong>Name:</strong> {collegeData.name}
            </p>
            <p>
              <strong>Location:</strong> {collegeData.address},{collegeData.city},{collegeData.state}
            </p>
            <p>
              <strong>Affiliation:</strong> {collegeData.affiliation}
            </p>
            <p>
              <strong>Certification:</strong> {collegeData.certification}
            </p>
            <p>
            <strong>Rating: {renderStars(collegeData.rating)}</strong>
            </p>
          </div>
        );
      case "reviews":
        return (
          <div>
            <HelpfulReviews collegeId={collegeData.id} />
            <MDBBtn onClick={toggleOpen}>Add Review</MDBBtn>
            <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Write Your Review</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <AddReview userId={userId} collegeId={collegeData.id} />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleOpen}>
                      Close
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </div>
        );
      default:
        return null;
    }
  };


  
  const handleProfileFileChange = (event) => {
    console.log(event.target.files[0]);
    setProfilefile(event.target.files[0]);
    setShowProfileUploadButton(true);
  };
  const uploadProfilePhoto = () => {
    console.log("profile function activated...")
    if (profilefile) {
      const formData = new FormData();
      formData.append("file", profilefile);
  
      Axios.put(`https://marvelous-abundance-production.up.railway.app/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          // Handle success
          console.log("Photo uploaded successfully");
          console.log(response.data);
  
          const ProfileDownloadUrl = response.data.fileDownloadUrl;
          const Profilename = response.data.filename;
  
          setProfilephotoUrl(ProfileDownloadUrl);
          setShowProfileUploadButton(false);
  
          // Update profile photo URL in the data state
          setCollegeData((prevData) => ({
            ...prevData,
            profilephotoUri: ProfileDownloadUrl,
          }));
  
          // Perform the PUT request to update user data with the photo URL
          const collegeId = collegeData.id;
          const putQuery = `update/profilephoto/${collegeId}`;
          const fullurl = `${url}${putQuery}`;
  
          Axios.put(fullurl, {
            profilephoto: Profilename,
            profilephotoUri: ProfileDownloadUrl,
          })
            .then((res) => {
              // Handle success
              console.log(res.data);
              console.log("Profile photo updated successfully");
            })
            .catch((error) => {
              // Handle error
              console.error("Error updating user profile:", error);
            });
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading photo:", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  
  
  const handleCoverFileChange = (event) => {
    console.log(event.target.files[0]);
    setCoverfile(event.target.files[0]);
    setShowCoverUploadButton(true);
  };
  const openURL = () => {
    const url = collegeData.applyweb; 
    window.open(url, '_blank'); // Opens the URL in a new tab/window
  };
  const brochureURL = () => {
    const burl = collegeData.brochurefileUri; 
    window.open(burl, '_blank'); // Opens the URL in a new tab/window
  };
  const uploadCoverPhoto = () => {
    if (coverfile) {
      const formData = new FormData();
      formData.append("file", coverfile);
  
      Axios.put(`https://marvelous-abundance-production.up.railway.app/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          // Handle success
          console.log("Cover Photo uploaded successfully");
          console.log(response.data);
  
          const CoverDownloadUrl = response.data.fileDownloadUrl;
          const Covername = response.data.filename;
  
          setCoverphotoUrl(CoverDownloadUrl);
          setShowCoverUploadButton(false);
  
          // Update profilephotoUri in the data state
          setCollegeData((prevData) => ({
            ...prevData,
            coverphotoUri: CoverDownloadUrl,
          }));
  
          // Perform the PUT request to update user data with the photo URL
          const collegeId = collegeData.id;
          const putQuery = `update/coverphoto/${collegeId}`;
          const fullurl = `${url}${putQuery}`;
  
          Axios.put(fullurl, {
            name: collegeData.name,
    firstName: collegeData.firstName,
    lastName: collegeData.lastName,
    phoneNumber: collegeData.phoneNumber,
    address: collegeData.address,
    state: collegeData.state,
    city: collegeData.city,
    email: collegeData.email,
    affiliation: collegeData.affiliation,
    certification: collegeData.certification,
    establishmentYear: collegeData.establishmentYear,
    brochurefileUri: collegeData.brochurefileUri,
    filename: collegeData.filename,
            profilephoto: collegeData.profilephoto,
            profilephotoUrl:collegeData.profilephotoUri,
            coverphoto: Covername,
            coverphotoUri: CoverDownloadUrl,
          })
            .then((res) => {
              // Handle success
              console.log(res.data);
              console.log("Coverphoto updated successfully");
            })
            .catch((error) => {
              // Handle error
              console.error("Error updating user profile:", error);
            });
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading photo:", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  const onHandleEdit = () => {
    console.log("Editing user:", collegeData);
    const collegeId = collegeData.id;
    console.log("User ID:", collegeId);
    navigate("/editcolprofile", { state: { id: collegeId } });
  };
  return (
    <div>
      <Navbar />
      <div  style={{ marginTop: '75px' }}>
        
        
        <MDBRow className="college-info">
          
      <a href={collegeData.coverphotoUri} target="_blank" rel="noopener noreferrer">
        <div style={{ position: 'relative', width: '100%', height: '350px' }}>
          <MDBCardImage
            src={collegeData.coverphotoUri}
            alt="avatar"
            className="cover"
            style={{ width: '100%', height: '100%' }}
            fluid />
            {isCurrentUserCollegeUser&&(
          <label htmlFor="coverFileInput" style={{ position: 'absolute', bottom: '0', right: '0', display: 'block' }} className="mt-2">
            <MDBIcon id="profilephoto" fas icon="camera-retro" size='2x' />
          </label>)}
        </div>
      </a>
      <input type="file" id="coverFileInput" onChange={handleCoverFileChange} style={{ display: 'none' }} />
      {showCoverUploadButton && (
        <MDBBtn onClick={uploadCoverPhoto} color="primary" style={{ display: isCollegeUser ? 'block' : 'none' }}>Upload</MDBBtn>
      )}
      <MDBCol md='4' style={{paddingTop: '35px'}}>
        <div>
        <a href={collegeData.profilephotoUri} target="_blank" rel="noopener noreferrer">
        <div style={{ position: 'relative', width: '350px', height: '350px', display: 'inline-block' }}>
          <MDBCardImage
            src={collegeData.profilephotoUri}
            alt="avatar"
            className="profile-avatar rounded-circle"
            style={{ width: '100%', height: '100%' }}
            fluid />
          {isCurrentUserCollegeUser&&(<label htmlFor="profileFileInput" style={{ position: 'absolute', bottom: '0', right: '0', display: 'block' }} className="mt-2">
            <MDBIcon id="profile-camera" fas icon="camera-retro" size='2x' />
            
          </label>

        )
        }
        </div>
      </a>
      <br/>
      {isCurrentUserCollegeUser&&(
      
              <MDBBtn className="w-10 mb-4" color="primary" size="md" onClick={onHandleEdit}>
                Edit Profile
              </MDBBtn>)}
          
        </div>
      
      <input type="file" id="profileFileInput" onChange={handleProfileFileChange} style={{ display: 'none' }} />
      {showProfileUploadButton && (
        <MDBBtn onClick={uploadProfilePhoto} color="primary" style={{ display: isCollegeUser ? 'block' : 'none' }}>Upload</MDBBtn>
      )}

      </MDBCol>
      
<MDBCol md='8' style={{paddingTop: '35px'}}>
<h1><strong>{collegeData.name}</strong></h1>
  <MDBTabs pills justify className='mb-3'>
    <MDBTabsItem>
      <MDBTabsLink
        active={activeTab === "overview"}
        onClick={() => setActiveTab("overview")}
      >
        Overview
      </MDBTabsLink>
    </MDBTabsItem>
    <MDBTabsItem>
      <MDBTabsLink
        active={activeTab === "reviews"}
        onClick={() => setActiveTab("reviews")}
      >
        Reviews
      </MDBTabsLink>
    </MDBTabsItem>
  </MDBTabs>
  {renderContent()}
  <div className="action-buttons">
    <button className="btn btn-primary" onClick={openURL}>Apply Now</button>
    <button className="btn btn-secondary" onClick={brochureURL}>Download Brochure</button>
  </div>
</MDBCol>
  
</MDBRow>
        
      </div>
    </div>
  );
};

export default CollegeDetail;
