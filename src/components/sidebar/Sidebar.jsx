import "./sidebar.scss";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';

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
              }  alt="" className=" company_logo mx-auto d-block rounded-circle mt-2" />
        </Link>
        <p className="companyNameTitle">{data.companyName}</p>
      </div>


      <div className="center" style={{paddingTop:'45%'}}  >
        <ul>
          <p className="title">OVERSIKT</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardOutlinedIcon className="icon" />
            <span >Kontrollpanel</span>
          </li>
          </Link>
          <p className="title">ADMINISTRASJON</p>
          
          {/* <Link to="/employee" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Ansatte</span>
            </li>
          </Link> */}

          <li>
            <AddShoppingCartOutlinedIcon className="icon" />
            <span>Kommende</span>
          </li>

          <Link to="/service" style={{ textDecoration: "none" }}>
            <li>
              <CategoryOutlinedIcon className="icon" />
              <span>Tjenester</span>
            </li>
          </Link>

          <Link to="/calender" style={{ textDecoration: "none" }}>
          <li>
            <CalendarTodayIcon className="icon" />
            <span>Kalender</span>
          </li></Link>

          <li>
            <AssignmentTurnedInOutlinedIcon className="icon" />
            <span>Utført</span>
          </li>
         
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          </Link>
        


          <p className="title">KOMMUNIKASJON & KUNDEKONTAKT</p>
          <li>
            <PostAddOutlinedIcon className="icon" />
            <span>Innlegg </span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Oppslag </span>
          </li>

          <li>
            <ContactPageOutlinedIcon className="icon" />
            <span>Følgere </span>
          </li>
          <li>
            <GroupsOutlinedIcon className="icon" />
            <span>Kunder </span>
          </li>



          <li>
            <MailOutlinedIcon className="icon" />
            <span>Innboks </span>
          </li>
          <li>
            <NewspaperOutlinedIcon className="icon" />
            <span>Nyhetsbrev </span>
          </li>




          <p className="title">STATISTIKK & BESØKSMÅLING</p>
          <li>
            <DonutSmallOutlinedIcon className="icon" />
            <span>Bedriftsstatistikk</span>
          </li>
          <li>
            <TableChartOutlinedIcon className="icon" />
            <span>Produkt statistikk </span>
          </li>
          <li>
            <TroubleshootOutlinedIcon className="icon" />
            <span>Kampanje statistikk</span>
          </li>

       
          <li>
            <CandlestickChartOutlinedIcon className="icon" />
            <span>Ansatt statistikk</span>
          </li>


          <p className="title">VERKTØY & INNSTILLINGER</p>

         
<li>

          <Dropdown className="dropdownSidebar">
          <Dropdown.Toggle className="profileImage " style={{content:''}} variant='' id="dropdown-basic">
          <div className="row mt-2">
          
                      <div className="col-md-8">
                      
                      <SettingsOutlinedIcon className="icon" />
                      <span>Instillinger </span>
                      
                      
                        </div>
                        <div className="col-md-3" >
                        <ArrowForwardIosIcon style={{fontSize: '12px', paddingRight:'3px'}}/>
                        </div>
                     
                        </div>       
                        </Dropdown.Toggle>
                        
<Dropdown.Menu>
  
  <Dropdown.Item href="#/action-1">
  <Link to="/account-settings" style={{ textDecoration: "none" }}>
          <li>
            <ManageAccountsOutlinedIcon className="icon" />
            <span>Profil informasjon</span>
          </li>
  </Link>
          </Dropdown.Item>
  <Dropdown.Item href="#/action-2">          <li>
            <RoomPreferencesOutlinedIcon className="icon" />
            <span>Bedriftsinnstillinger</span>
          </li></Dropdown.Item>
  <Dropdown.Item href="#/action-2">  <li>
            <SettingsApplicationsOutlinedIcon className="icon" />
            <span>Betalingsinnstillinger</span>
          </li></Dropdown.Item>
          <Dropdown.Item href="#/action-2">
          <Link to="/platform-settings" style={{ textDecoration: "none" }}>
              <li>
            <DisplaySettingsOutlinedIcon className="icon" />
            <span>Plattform innstillinger</span>
          </li>
          </Link>
          </Dropdown.Item>
          
</Dropdown.Menu>
</Dropdown> 
</li>





        
          {/* <li>
            <ExitToAppIcon className="icon" />
            <span onClick={signUserOut}>Logg ut</span>
          </li> */}
        </ul>
      </div>
      <hr className="sidebarhr"/>
<div className="bottom">
        <ul>
        <li>
            <ExitToAppIcon className="icon" />
            <span onClick={signUserOut}>Logg ut</span>
          </li>
        </ul>
      
        </div>

      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
