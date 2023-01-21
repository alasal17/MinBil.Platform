
import { Box, Container, Typography } from '@mui/material';

import { SettingsNotifications } from './settings-notifications';
import { SettingsPassword } from './settings-password';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

function PlatfromSettings() {
    return (  
    
        <div className="single">
              <Sidebar />
              <div className="singleContainer">
                <Navbar />
                <div className="top">
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
        </div></div> </div>
    );
}

export default PlatfromSettings;


