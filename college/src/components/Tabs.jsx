import React, { useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,MDBIcon,
    MDBCardText
  } from 'mdb-react-ui-kit';
import Category from './Category';
import './Tabs.css';
export default function Tabs() {
  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <>
      <MDBTabs pills justify className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink  onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
          <MDBIcon fas icon="landmark" size='2x'/>
            <h6 >Colleges</h6>
          </MDBTabsLink>
        </MDBTabsItem>
      
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={justifyActive === 'tab1'}>
          <Category/>
         
          {/* Add more college cards for the Engineering Colleges */}
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'tab2'}>
          <Category/>
          {/* Add more college cards for the Medical Colleges */}
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'tab3'}>
        <Category/>
           
          {/* Add more college cards for the Arts and Science Colleges */}
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}