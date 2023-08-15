import React, { useState } from 'react'; // Import useState

import "./navbar.scss";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ onClick }) => {
  const { currentUser } = useContext(AuthContext);
  const myButtonRef = useRef(null);

  // Add state to manage whether sidebar is open or not
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className={`navbar ${sidebarOpen ? 'sidebar-open' : ''}`}>

      <div className="wrapper">
        <div hidden={true}>
          {/* Your hidden content */}
        </div>
        <div className="items">
          <div className="navbar-content">
  
              <MenuIcon className="icon" onClick={onClick} />
        
          </div>
          {/* Rest of your content */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
