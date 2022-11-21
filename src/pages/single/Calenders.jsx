import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot
} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { db } from "../../firebase";
import EventList from "../list/EventList";
import "./single.scss";
import timeGridPlugin from '@fullcalendar/timegrid';

export const auth = getAuth();
function Calendars() {
  const [data, setData] = useState([]);
  const dataColor = 'red';

  const auth = getAuth();

  useEffect(() => {
    // LISTEN (REALTIME)
 
  
    const unsub = onSnapshot(
      
      collection(db, "booking"),
      (snapShot) => {
        let list = [];
       
        
          snapShot.docs.forEach((doc) => {
           
           
            if(doc.data().uid === auth.currentUser.uid ){
              
              list.push({ id: doc.id, status: doc.data().status, price: doc.data().price, title:doc.data().title, start: (doc.data().startDate+'T'+ doc.data().startTime), customerUid:doc.data().customerUid});


            
              
          }
          if(doc.data().status === false){
           
            
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
      
       
   
   <div className="single">
       <Sidebar />
       <div className="singleContainer">
         <Navbar />
       <div className="left">
       <div >
       <FullCalendar 
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    
                    headerToolbar={{
                      center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    height='auto'
                    editable={true}
                    events={data}/>
                    </div>
</div> <EventList/></div></div>
    )
  }



  export default Calendars;