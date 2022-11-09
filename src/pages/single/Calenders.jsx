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
export const auth = getAuth();
function Calendars() {
  const [data, setData] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    // LISTEN (REALTIME)
 
  
    const unsub = onSnapshot(
      
      collection(db, "events"),
      (snapShot) => {
        let list = [];

        
          snapShot.docs.forEach((doc) => {
           
           
            if(doc.data().uid === auth.currentUser.uid){
              list.push({ id: doc.id, ...doc.data() });
              
              
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
    }
  },);
  
  

 

 


    return (
      
       
   
   <div className="new">
       <Sidebar />
       <div className="newContainer">
         <Navbar />
       <div>
       <div className="datatableTitle">
        
        <Link to="/calender/new" className="link">
        Legg til ny
        </Link>

        

      </div>
       return <FullCalendar 
                    defaultView="dayGridWeek" 
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={true}
                    
                    eventClick={
                      function(arg) {
                    
                        Swal.fire({
                          titleText: arg.event.title,
                          html: 'Pris: ' + arg.event.extendedProps.price + ' <br/> <br/>' + 'Start tid: ' +new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(arg.event.start),
                         
                     
                          
                          
                          
                        })
                      }
                    }
                    events={data}
                   
                    
                />
</div></div></div>
    )
  }



  export default Calendars;