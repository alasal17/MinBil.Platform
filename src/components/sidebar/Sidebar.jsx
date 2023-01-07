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
import { signOut } from "firebase/auth";
import { auth} from "../../firebase";
import React, { useContext, useState,useEffect } from 'react';
import { AuthContext} from "../../context/AuthContext";
import {
  collection,
  onSnapshot,
  where,
  query
} from "firebase/firestore";
import { db} from "../../firebase";

const Sidebar = () => {
  

  const { dispatch } = useContext(DarkModeContext);
  const [data, setData] = useState({});
  const {currentUser} = useContext(AuthContext);
  
  useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      
      query(collection(db, "company"), where("uid", "==", currentUser.uid)),
      (snapShot) => {
    

                
      
        
        snapShot.docs.map((doc) => {
          setData({uid:doc.data().uid, companyName: doc.data().companyName, companyLogo:doc.data().companyLogo});
              
            
          });
 
      },
      (error) => {
        console.log(error);
      }
    );
  
  

    return () => {
      unsub();
    };
  }, );
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/login";
    });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none"}}>
          <img src={
                data.companyLogo
                  ? data.companyLogo
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }  alt="" className="rounded company_logo mx-auto d-block rounded-circle mt-5" />
        </Link>
        
      </div>

      <div className="center" style={{paddingTop:'30%'}}  >
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
