import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState,useEffect, useRef } from "react";
import { db} from "../../firebase";
import { AuthContext} from "../../context/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  collection,
  onSnapshot,
  where,
  query,
  getDocs
} from "firebase/firestore";
import React  from 'react';
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RegistrationForm from "../popup/RegistrationForm";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [data, setData] = useState({});
  const {currentUser} = useContext(AuthContext)
  const [colorTheme, setColorTheme] = useState('green-theme');
  const userID = currentUser.uid;
  const [cTheme, setCTheme] = useState('');

  const myButtonRef = useRef(null);
  





// async function getData() {
//   const q = query(collection(db, "company"), where("uid", "==", userID));
//   const querySnapshot = await data
//   const docs = querySnapshot.companyName;
//   console.log("Current data: ", docs);

//   if(docs === undefined)
//   {
//     myButtonRef.current.click()
//   }
// }
  
// useEffect(() => {
//   getData()
// },);

  return (
    <div className={`navbar`}>
      <div className="wrapper">
      <div hidden={true}>
        <RegistrationForm  buttonName='Register deg' ref_reg={myButtonRef} />
        </div>
        {/* <div className="search">
          <input type="text" placeholder="Søk..." />
          <SearchOutlinedIcon />
        </div> */}
        
        <div className="items">
      
     
{/*
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Norsk
          </div>

           <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
           */}
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}

          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> 
          
         
            
              
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>

          <div className="item">
          <ul className="navbarUl">
     <Dropdown>
      <Dropdown.Toggle className="profileImage" variant='' style={{backgroundColor:''}} id="dropdown-basic">
      <img
            src={
               "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            } alt="" className="rounded avatar  d-block rounded-circle"/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <li className="navbarLi">
            <AccountCircleOutlinedIcon className="navbarIcon" />
            <span className="navbarSpan">Profil</span>
          </li>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Natt modus:  <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> 
    </ul>

    
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
