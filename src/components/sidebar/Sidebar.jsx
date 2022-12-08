import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth} from "../../firebase";
import React from 'react';

const Sidebar = () => {

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/login";
    });
  };

  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none"}}>
          <span className="logo">Min bil</span>
        </Link>
      </div>
    
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashbord</span>
          </li>
          </Link>
          <p className="title">LISTER</p>
          
          <Link to="/employee" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Ansatte</span>
            </li>
          </Link>

          <Link to="/service" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Tjenester</span>
            </li>
          </Link>

          <Link to="/calender" style={{ textDecoration: "none" }}>
          <li>
            <CalendarTodayIcon className="icon" />
            <span>Kalender</span>
          </li></Link>

          <li>
            <LocalShippingIcon className="icon" />
            <span>Utført</span>
          </li>
          <p className="title">NYTTIG</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Varsler</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Systemhelse</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logger </span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Innstillinger</span>
          </li>
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={signUserOut}>Logg ut</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
