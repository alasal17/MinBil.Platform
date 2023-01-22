

import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './account.scss'

import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField, Typography, Container
} from "@mui/material";
import {
  doc,
  collection,
  serverTimestamp,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import MuiPhoneInput from "material-ui-phone-number";
import { AuthContext} from "../../../context/AuthContext";
import { auth, db, storage } from "../../../firebase";

function AccountSettings() {
    const [key, setKey] = useState('profile');

    const [companyData, setCompanyData] = useState({});
    const {currentUser} = useContext(AuthContext);

  
    // style={{position:'absolute'}}


    return ( 
        <div className="single" >
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top " >
          <Tabs 
          id="controlled-tab-example "
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-1"
     
        
    >
      <Tab eventKey="profile" title="Profile" >
        
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 0
      }}
    >

      <Container maxWidth="lg" className='companyInfoAccount'>
        <Typography
          sx={{ mb: 0 }}
          variant="h4"
          className='text-center '
        >
          Bedrift informasjon
        </Typography>
        <Grid
          container
          spacing={0}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
         
          </Grid>
          <Grid
            item
            lg={10}
           
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
      </Tab>
      <Tab eventKey="sosialemedier" title="Sosiale Medier">
      <Box
   
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg"  className='companyInfoAccount'>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
          className='text-center'
        >
          Sosiale Medier
        </Typography>
        <Grid
          container
          spacing={3}
        >
         
          <Grid
            item
            lg={10}
           
          >
           
          </Grid>
        </Grid>
      </Container>
    </Box>
      </Tab>
      <Tab eventKey="openingHours" title="Åpningstider">
      <Box
  
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg"  className='companyInfoAccount'>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
          className='text-center'
        >
          Åpningstider
        </Typography>
        <Grid
          container
          spacing={3}
        >
         
          <Grid
            item
            lg={10}
           
          >
       
          </Grid>
        </Grid>
      </Container>
    </Box>
      </Tab>
    </Tabs>
            
          
            </div>
            </div>
            </div>
     );
}

export default AccountSettings;
