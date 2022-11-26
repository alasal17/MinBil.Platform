import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

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



import Chart from "../../components/chart/Chart";

const Profile = () => {
   
    const [data, setData] = useState({});
    const {currentUser} = useContext(AuthContext)
  
    
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
               about: doc.data().about});
                          
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
                <div className="line"></div>
                <h2 style={{textAlign:'center', fontWeight: '500'}}>Om Oss</h2>
             <p style={{fontWeight: '300', margin:'20px', textAlign:'center'}}>{data.about}</p>
            
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
