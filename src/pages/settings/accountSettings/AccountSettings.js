
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState } from 'react';
import './account.scss'
function AccountSettings() {
    const [key, setKey] = useState('profile');
    return ( 
        <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <div className="top">
          <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="profile" title="Profile">
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg" className='companyInfoAccount'>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
          className='text-center'
        >
          Bedrift informasjon
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
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
            <AccountProfileDetails />
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
            <AccountProfileDetails />
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
