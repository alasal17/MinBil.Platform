import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import React, { useState, useEffect, useContext }   from 'react';
import {
    collection,
    onSnapshot,
    query, 
    where
  } from "firebase/firestore";

import ServiceCard from './ServiceCard'
import { db } from "../../firebase";
import { AuthContext} from "../../context/AuthContext";

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Chart from "../../components/chart/Chart";
import { Link } from "react-router-dom";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
const Profile = () => {
   
    const [data, setData] = useState({});
    const {currentUser} = useContext(AuthContext)
    const [openingDays , setOpeningDays] = useState([])
    
  useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      
      query(collection(db, "company"), where("uid", "==", currentUser.uid)),
      (snapShot) => {
    
        snapShot.docs.map((doc) => {
          setData({uid:doc.data().uid,
             companyName: doc.data().companyName,
              companyLogo:doc.data().companyLogo,
               email:doc.data().email,
               address:doc.data().address,
               country:doc.data().country,
               phoneNumber:doc.data().phoneNumber,
               about: doc.data().about,
               role: doc.data().role,
               orgNumber:doc.data().orgNumber,
               CEO:doc.data().CEO,
               website:doc.data().website,
               openingDays:doc.data().openingDays,
               openingHours:doc.data().openingHours,
               facebook:doc.data().facebook,
               youtube:doc.data().youtube,
               linkedin:doc.data().linkedin,
               instagram:doc.data().instagram});
                          
          });

          snapShot.docs.map((doc) => {
            setOpeningDays({
                 mandag:doc.data().openingHours[0],
                 tirsdag:doc.data().openingHours[1],
                 onsdag:doc.data().openingHours[2],
                 torsdag:doc.data().openingHours[3],
                 fredag:doc.data().openingHours[4],
                 lørdag:doc.data().openingHours[5],
                 søndag:doc.data().openingHours[6]
              
                 });
                            
            });

            console.log(openingDays)
          
      },
      (error) => {
        console.log(error);
      }
    );
  
  

    return () => {
      unsub();
    };
  }, );





  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" >Endre</div>
            <h1 className="title">Informasjon</h1>
            <div className="item">
              <img src={data.companyLogo} alt="" className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">{data.companyName}</h1>
                </div></div>
                <div className="items">
                <div className="detailss">
                <div className="detailItems">
                  <span className="itemKeys">E-post:</span>
                  <span className="itemValues">{data.email}</span>
                  <span className="itemKeys">Telefon:</span>
                  <span className="itemValues" >{data.phoneNumber}</span>
                  
                  <span className="itemKeys">Adresse:</span>
                  <span className="itemValues">{data.address}
                  </span>
                  <span className="itemKeys">Land:</span>
                  <span className="itemValues">{data.country}</span>
                  </div>
                </div>
                </div>
                <div className="items">
                <div className="detailss">
                <div className="detailItems">
                  
                <span className="itemKeys">Bransje:</span>
                  <span className="itemValues">{data.role}</span>

                  <span className="itemKeys">Org. Nummer:</span>
                  <span className="itemValues" >{data.orgNumber}</span>

                  <span className="itemKeys">Dagligleder:</span>
                  <span className="itemValues" >{data.CEO}</span>

                 
                  
                  </div></div>
                  </div>

                  <div className="items">
                <div className="detailss">
                <div className="detailItems">
                <span className="itemValues">
                <a href={
                  data.website
                  ? data.website : ""} target="_blank">
                  <LanguageRoundedIcon color="primary"/>
                  </a></span>


                  <span className="itemValues">
                <a href={
                  data.facebook
                  ? data.facebook: ""} target="_blank">
                  <FacebookIcon style={{color:"#3b5998"}}/>
                  </a></span>

                  <span className="itemValues">
                <a href={
                  data.linkedin
                  ? data.linkedin : "" } target="_blank">
                  <LinkedInIcon style={{color:"#0072b1"}}/>
                  </a></span>

                  <span className="itemValues">
                <a href={
                  data.instagram
                  ? data.instagram : "" } target="_blank">
                  <InstagramIcon style={{color:"#4c68d7"}}/>
                  </a></span>

                  <span className="itemValues">
                <a href={
                  data.youtube
                  ? data.youtube : "" } target="_blank">
                  <YouTubeIcon style={{color:"#FF0000"}}/>
                  </a></span>
                
                </div></div>
                </div>
                <div className="line"></div>
                
                            
                
                
                <h2 style={{textAlign:'center', fontWeight: '500'}}>Om Oss</h2>
             <p style={{fontWeight: '300', margin:'20px', textAlign:'center'}}>{data.about}</p>
             <div className="items">
                <div className="detailss">
                <div className="detailItems">
                <span className="itemKeys">Åpningstider:</span>
                  <span className="itemValues" >{Object.keys(openingDays).map((key, index) =>{
                    return(
                      <p>{key} : {openingDays[key]}</p>
                      
                    )
                  })}</span>
                </div></div>
                </div>    
            
          </div>
         
        </div>
        <div className="bottom">
        <h1 className="title">Aktive tjenester</h1>
          <ServiceCard  logo={data.companyLogo}/>
              </div>
              <div className="bottom" style={{marginBottom:'40px'}}>
              <div className="charts">
   
          <Chart title="Besøkende siste måneden" aspect={6 / 1} />
        </div>
        </div >
      </div>
    </div>
  );
};

export default Profile;
