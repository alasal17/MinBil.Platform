
import { Box, Container, Typography } from '@mui/material';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { SettingsNotifications } from './settings-notifications';
import { SettingsPassword } from './settings-password';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import React, { useState, useContext, useEffect } from "react";

function PlatfromSettings() {
  const [key, setKey] = useState('Varsleringer');
    return (  
    
        <div className="single">
              <Sidebar />
              <div className="singleContainer">
                <Navbar />
                <div className="top">
                  <Tabs 
          id="controlled-tab-example "
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-1">
                <Tab eventKey="Varsleringer" title="Varsleringer">
                <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Plattformen innstillinger
        </Typography>
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
    </Tab>
    </Tabs>



    <Tabs 
          id="controlled-tab-example "
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-1">
                <Tab eventKey="Utsende" title="Varsleringer">
                <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Plattformen innstillinger
        </Typography>
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
    </Tab>
    </Tabs>
        </div></div> </div>
    );
}

export default PlatfromSettings;


