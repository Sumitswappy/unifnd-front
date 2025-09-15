import React,{useEffect} from "react";
import { useNavigate,Outlet } from "react-router-dom";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import AdminSidenav from "../components/AdminComponents/AdminSidenav";
import AdminUpbar from "../components/AdminComponents/AdminUpbar";

const AdminHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionData = sessionStorage.getItem("admin");
    if (!sessionData) {
      navigate("/admin"); // or any other route you want to redirect to
    }
  }, [navigate]);
  return (
    <MDBRow>
      <AdminUpbar/>
      <MDBCol size='12' md='2'>
        <AdminSidenav />
      </MDBCol>
      <MDBCol size='12' md='10'>
        <Outlet />
      </MDBCol>
      
    </MDBRow>
  );
};

export default AdminHome;
