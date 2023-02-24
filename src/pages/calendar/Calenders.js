import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect, useContext, useRef }   from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { db } from "../../firebase";
import EventList from "../list/EventList";
import { AuthContext} from "../../context/AuthContext";
import timeGridPlugin from '@fullcalendar/timegrid';
import Popup from "../../components/popup/Popup";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import RegistrationForm from "../../components/popup/RegistrationForm";
export const auth = getAuth();


const Calendars = () => {
  const [data, setData] = useState([]);
  const dataColor = 'red';
  const [registerButton, setRegisterButton] = useState(false)
  
  const {currentUser} = useContext(AuthContext)
 


  const [data2, setData2] = useState({});
  const userID = currentUser.uid;
  const myButtonRef = useRef(null);


  useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      collection(db, "company"),
      (snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
            if(doc.id === userID){
              list.push({id: doc.id, ...doc.data()});
          }

         
        });

        setData(list);
      },

      (error) => {
        console.log(error);
      }
    );

  }, []);





  // useEffect(() => {
  //   // LISTEN (REALTIME)
  //   const unsub = onSnapshot(
      
  //     collection(db, "booking"),
  //     (snapShot) => {
  //       let list = [];
       
        
  //         snapShot.docs.forEach((doc) => {
           
           
  //           if(doc.data().uid === auth.currentUser.uid ){
              
  //             list.push({ id: doc.id, status: doc.data().status, price: doc.data().price, title:doc.data().title, start: (doc.data().startDate+'T'+ doc.data().startTime), customerUid:doc.data().customerUid});


            
              
  //         }
  //         if(doc.data().status === false){
           
            
  //       }
         
  //         });
  //       data2(list);
        
  //     },

  //     (error) => {
  //       console.log(error);
        
  //     }
  //   );

   
  // },);
  
  

 

 


    return (
      
       <div>
   
   <div className="single">
       <Sidebar />
       <div className="singleContainer">
         <Navbar />
         <div className="container" style={{paddingTop:"10px"}}>
    <div className="main-body">
    <div>
                <div className="col-sm-12">
                      <button className="btn btn-info "  onClick={() => setRegisterButton(true)}>Registrer deg</button>
                    </div>
                </div><div >
      
      

       <FullCalendar 
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    
                    headerToolbar={{
                      center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    height='auto'
                    editable={true}
                    events={data2}/>
                    </div> 
</div> 
</div> 
        
        </div>
        
        </div>
        <div hidden={true}>
        <RegistrationForm  buttonName='Register deg' ref_reg={myButtonRef} />
        </div>
      
        <Popup trigger={registerButton} setTrigger={setRegisterButton}> 
  
    <form onSubmit="">
    <div className="row">
        <div className="col-md-3 border-right">
        
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img 
              src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            
              alt="" className="rounded-circle mt-5" width="150px" 
            />
            
                    {/* <span className="font-weight-bold">Bedriftslogo</span><span> </span> */}
                    <div className="col-md-6 mt-4 text-center">
                    
                    <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                
                type="file"
                id="file"
                
                style={{ display: "none" }}
              />
        </div></div></div>
        
        
        <div className="col-md-5 border-right">
        
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profil skjema</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6" key='orgNumber'><label className="labels">Org. nummer</label>
                    <input type="text" id="orgNumber" className="form-control" placeholder="org. nummer ..."  /></div>

                    <div className="col-md-6" key='CEO'><label className="labels">Dagligleder</label>
                    <input type="text" id ="CEO" className="form-control"  placeholder="dagligleder ..." /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12" key='companyName'><label className="labels">Bedriftsnavn</label>
                    <input type="text" id="companyName" className="form-control" placeholder="bedriftsnavn ..." /></div>
                    
                    <div className="col-md-12" key='email'><label className="labels">E-post</label>
                    <input  type="text" id="email" className="form-control" placeholder="epost ..."  /></div>
                    
                    <div className="col-md-12" key='phoneNumber'><label className="labels">Telefon nummer</label>
                    <input  id ="phoneNumber"type="text" className="form-control" placeholder="telefon ..." /></div>
                    
                    <div className="col-md-12" key='country'><label className="labels">Land</label>
                    <input type="text" id ="country"  className="form-control" placeholder="land ..."/></div>
                    
                    <div className="col-md-12" key='address'><label className="labels">Adresse</label>
                    <input type="text" id ="address" className="form-control" placeholder="adresse ..."  /></div>
                    
                    <div className="col-md-12" key='facebook'><label className="labels">Facebook</label>
                    <input type="text" id ="facebook" className="form-control" placeholder="facebook ..." /></div>
                    
                    <div className="col-md-12" key='instagram'><label className="labels">Instagram</label>
                    <input type="text"  id ="instagram" className="form-control" placeholder="instagram ..." /></div>
                    
                    <div className="col-md-12" key='website'><label className="labels">Nettside</label>
                    <input type="text" id ="website" className="form-control" placeholder="nettside ..."  /></div>
                
                </div>
                <div className="row mt-3" >
                    <div className="col-md" key='about'><label className="labels">Om oss</label>
                    <textarea type="text" className="form-control" placeholder="Om oss ...." id="about" /></div>
                    
                </div>
                <div className='row mt-3'>
                <div className="col-md-6 mt-4 text-center">
                  <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                  </div>
                <div className="col-md-6 mt-4 text-center">
                <button className="btn btn-primary profile-button" type="button" onClick={ e => setRegisterButton(false)}>
                Avslutt</button></div>
                </div>
                
            </div>
          
        </div>
        
      <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div>
                <br/>
                <div className="col-md-12"><label className="labels">Experience in Designing</label>
                <input type="text" className="form-control" placeholder="experience" /></div> 
                <br/>
                <div className="col-md-12"><label className="labels">Additional Details</label>

                <input type="text" className="form-control" placeholder="additional details" /></div>
            </div>

                <input type="text" className="form-control" placeholder="additional details" />
                </div>
            </div>
    
   
    </form>
        </Popup>
        </div>
    )
  }



  export default Calendars;