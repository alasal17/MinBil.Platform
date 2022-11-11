import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { Component } from 'react'
import FullCalendar, { getDateMeta } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import { getData } from "ajv/dist/compile/validate";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { db } from "../../firebase";
import EventList from "../list/EventList";

export const auth = getAuth();
function Calendars() {
  const [data, setData] = useState([]);
  const dataColor = 'red';

  const auth = getAuth();

  useEffect(() => {
    // LISTEN (REALTIME)
 
  
    const unsub = onSnapshot(
      
      collection(db, "events"),
      (snapShot) => {
        let list = [];
       
        
          snapShot.docs.forEach((doc) => {
           
           
            if(doc.data().uid === auth.currentUser.uid ){
              
              list.push({ id: doc.id, booked: doc.data().booked, price: doc.data().price, title:doc.data().title, start: (doc.data().start_date+'T'+ doc.data().start_time)});


            
              
          }
          if(doc.data().booked === false){
           
            
        }
         
          });
        setData(list);
        
         
  
  
        
      
      },

      (error) => {
        console.log(error);
        
      }
    );

    return () => {
      unsub();
      const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
      clearTimeout(timer)
    }
  },);
  
  

 

 


    return (
      
       
   
   <div className="new">
       <Sidebar />
       <div className="newContainer">
         <Navbar />
       <div>
     
       <FullCalendar 
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={true}
                    
                    
                    events={data}
                    
                    
                        
  
                   
                    
                   
                    
                />
</div> <EventList/></div></div>
    )
  }



  export default Calendars;