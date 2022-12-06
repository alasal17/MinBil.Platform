import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React  from 'react';
import { AuthContext} from "../../context/AuthContext";


const AddEvent = ({ inputs, title}) => {

  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()
  const postsCollectionRef = collection(db, "offer");

  const [services, setService] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const user = currentUser.uid;
    const serviceData = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().uid === user){
          
          list.push({ id: doc.id, ...doc.data() });
          }
          
        })
        setService(list);
      
      },
      (error) => {
        console.log(error);
      }
    )

   
  });


  


  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    

    setData({ ...data, [id]: value });
  };


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      
      await addDoc(postsCollectionRef, {
        
        ...data,
        title:search,
        estimatedTime:filteredContacts.map((service) =>(service.estimatedTime))[0],
        tags:filteredContacts.map((service) =>(service.tags))[0],
        booked: false,
        imageUrl:filteredContacts.map((service) =>(service.imageUrl)),
        createdAt: serverTimestamp(),
        uid:  currentUser.uid,
      });
     
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    setFilteredContacts(
      services.filter(
        (service) =>
        service.title.toLowerCase().includes(search.toLowerCase()) 
      )
    );
  }, [search, services]);
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar img={data.imageUrl}/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
              src={
                
                filteredContacts.map((service) =>(service.imageUrl))
                  ?filteredContacts.map((service) =>(service.imageUrl))
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              
              <div className="formInput" key={inputs.map((input) => input.id)}>
              <label>Tittel</label>
              <input id="title" type="text"  onChange={(e) => setSearch(e.target.value)} />
              <label>Tilbud pris</label>
              <input id="price" type="text" onChange={handleInput}  placeholder="3000"/>
              <label>Varighet</label>
              <input id="estimated_time" type="text" defaultValue={filteredContacts.map((service) =>(service.estimatedTime))}/>
              <label>Tags</label>
              <input id="tags" type="text" defaultValue={filteredContacts.map((service) =>(service.tags))}/>
              
            
              <p style={{paddingTop:'30px', paddingBottom:'30px'}}>Start og slutt dato for kampanjen</p>

              <label>Dato</label>
              <input id="startDate" onChange={handleInput} type="date" />
              <label>Klokkeslett</label>
              <input id="endDate" onChange={handleInput} type="date" />
            

              </div>
              
    
          
              
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
