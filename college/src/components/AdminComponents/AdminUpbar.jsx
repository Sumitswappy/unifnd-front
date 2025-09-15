
import React, { useEffect,useState } from 'react';
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarLink,
  MDBContainer,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AdminUpbar.css'; // Uncomment this line to import the CSS file

export default function AdminUpbar() {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };
 
  function handleRefresh() {
    window.location.reload();
  }
  const [openNavSecond, setOpenNavSecond] = useState(false);
  return (
    
    <MDBNavbar className='upbar' expand="lg" light bgColor="light">
      <MDBContainer className='upbar' fluid>
        <MDBNavbarToggler
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavSecond} className="navbar-collapse-scroll">
          <MDBNavbarNav>
          <MDBIcon fas icon="book-open" size="2x" />
          <h5>Unifind.in</h5>
          <div className="position-sticky">
            <MDBNavbarLink
              onClick={() => handleVerticalClick('tab1')}
              active={verticalActive === 'tab1'}
              tag={NavLink}
              to="/AdminHome/dashboard"
            >
              Dashboard
            </MDBNavbarLink>
            <MDBAccordion flush>
              <MDBAccordionItem collapseId={1} headerTitle="User">
                <MDBNavbarLink
                  onClick={() => handleVerticalClick('tab1')}
                  active={verticalActive === 'tab1'}
                  tag={NavLink}
                  to="/AdminHome/add-user"
                >
                  Add User
                </MDBNavbarLink>
                <MDBNavbarLink
                  onClick={() => handleVerticalClick('tab2')}
                  active={verticalActive === 'tab2'}
                  tag={NavLink}
                  to="/AdminHome/view-user"
                >
                  View User
                </MDBNavbarLink>
              </MDBAccordionItem>
            </MDBAccordion>
            <MDBAccordion flush>
              <MDBAccordionItem collapseId={2} headerTitle="College">
                <MDBNavbarLink
                  onClick={() => handleVerticalClick('tab1')}
                  active={verticalActive === 'tab1'}
                  tag={NavLink}
                  to="/AdminHome/add-college"
                >
                  Add College
                </MDBNavbarLink>
                <MDBNavbarLink
                  onClick={() => handleVerticalClick('tab2')}
                  active={verticalActive === 'tab2'}
                  tag={NavLink}
                  to="/AdminHome/view-college"
                >
                  View College
                </MDBNavbarLink>
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
   
  );
}
