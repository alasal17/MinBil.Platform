import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,

} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import React  from 'react';
import { Object } from "via";


const AddEvent = ({ inputs, title}) => {
  const [file, setFile] = useState("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()
  const postsCollectionRef = collection(db, "events");
  const [isChecked, setIsChecked] = useState(false);
  const color = '';
  const [services, setService] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser.uid;
    const serviceData = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().userID === user){
          
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
        price:filteredContacts.map((service) =>(service.price))[0],
        estimated_time:filteredContacts.map((service) =>(service.estimated_time))[0],
        tags:filteredContacts.map((service) =>(service.tags))[0],
        booked: false,
        photo_url:filteredContacts.map((service) =>(service.photo_url)),
        timeStamp: serverTimestamp(),
        uid:  auth.currentUser.uid,
      });
      console.log(auth.currentUser.uid)
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
        <Navbar img={data.photo_url}/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
              src={
                
                filteredContacts.map((service) =>(service.photo_url))
                  ? filteredContacts.map((service) =>(service.photo_url))
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              
              <div className="formInput" key={inputs.map((input) => input.id)}>
              <label>Tittel</label>
              <input id="title" type="text" onChange={(e) => setSearch(e.target.value)} />
              <label>Price</label>
              <input id="price" type="text"  placeholder="1000"  value={ filteredContacts.map((service) =>(service.price)) }/>
              <label>Varighet</label>
              <input id="estimated_time" type="text" value={filteredContacts.map((service) =>(service.estimated_time))}/>
              <label>Tags</label>
              <input id="tags" type="text" value={filteredContacts.map((service) =>(service.tags))}/>

              <label>Dato</label>
              <input id="start_date" onChange={handleInput} type="date" />
              <label>Klokkeslett</label>
              <input id="start_time" onChange={handleInput} type="time" />
            

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
