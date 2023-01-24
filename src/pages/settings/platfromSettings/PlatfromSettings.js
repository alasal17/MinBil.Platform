
import { Box, Container, Typography } from '@mui/material';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { SettingsNotifications } from './settings-notifications';
import { SettingsPassword } from './settings-password';
import { ThemeSwitch } from './settings-themes-switch';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import React, { useState, useContext, useEffect } from "react";

function PlatfromSettings() {
  const [key, setKey] = useState('Varsleringer');
    return (  
    
        <div className="single ">
              <Sidebar />
              <div className="singleContainer">
                <Navbar />
                <div className="top">
                  <Tabs 
          id="controlled-tab-example "
          // activeKey={key}
          // onSelect={(k) => setKey(k)}
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
  
        <SettingsNotifications />

      </Container>
    </Box>
    </Tab>


    <Tab eventKey="Themes" title="Themes">
                <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">

        <ThemeSwitch/>
  
      </Container>
    </Box>
    </Tab>

    <Tab eventKey="Passord" title="Passord og sikkerhet">
                <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
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


