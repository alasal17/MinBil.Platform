
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import React, { useState, useEffect, useContext, useRef }   from 'react';
import {
  addDoc,
    collection,
    onSnapshot,
    query, 
    where,
    serverTimestamp
  } from "firebase/firestore";

import { auth, db, storage } from "../../firebase";
import { AuthContext} from "../../context/AuthContext";
import RegistrationForm  from "../../components/popup/RegistrationForm";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Profile = () => {
   
    const [data, setData] = useState({});
    const {currentUser} = useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [registerButton, setRegisterButton] = useState(false)
    const userID = currentUser.uid;
    const [isData, setIsData] = useState('')
    const [visitorsData, setVisitorData] = useState('')
    const [file, setFile] = useState("");
    const [data2, setData2] = useState({});
    const [per, setPerc] = useState(null);
    const [altinnData, setAltinnData] = useState([]);
    const postsCollectionRef = collection(db, "company");
    const myButtonRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

  
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData2((prev) => ({ ...prev, companyLogo: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  

const handleChange = async event => {
setSearchTerm(event.target.value);
}

const handleSubmit = async event => {
event.preventDefault();
fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
.then(response => response.json())
.then(data => {
  setAltinnData(data)
  

})
}


  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData2({ ...data2, [id]:value})

   
  }
  
  const handleAdd = async (e) => {
    e.preventDefault();
    setRegisterButton(false)
    try {
      
      await addDoc(postsCollectionRef, {
     
        ...data2,
        openingDays:[''],
        openingHours:[''],
        status:true,
        createdAt: serverTimestamp(),
        uid:  auth.currentUser.uid,
      });
      
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
 



<div className="single">
      
<Sidebar sidebarOpen={sidebarOpen} />
      
      <div className="singleContainer">
      <Navbar onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="">
<div className="container" style={{paddingTop:"10px"}}>
    <div className="main-body">
    
      
      
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={data.companyLogo  ? data.companyLogo
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="Admin" className="rounded-circle" width="250"/>
                    <div className="mt-3">
                      <h4>{data.companyName}</h4>
                      <p className="text-secondary mb-1">{data.role}</p>
                      <p className="text-muted font-size-sm">{data.address}</p>
                      {/* <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{paddingRight:'6px', transform: 'translateX(0px)'}} strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">{data.website}</span>
                  </li>
              
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{paddingRight:'6px', transform: 'translateX(0px)'}} strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5">
                        </rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span className="text-secondary" > {data.instagram}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{paddingRight:'6px', transform: 'translateX(0px)'}} strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span className="text-secondary">{data.facebook}</span>
                  </li>
                
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Dagligleder</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.CEO}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">E-post</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Telefon</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.phoneNumber}
                    </div>
                  </div>
                  <hr/>
              
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Adresse</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {data.address}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                  {isData}
                  </div>
                </div>
              </div>
<RegistrationForm buttonName={'Registerering'}/>
              
{/* {visitorsData} */}


            </div>
          </div>

        </div>
    </div>


    </div></div>
    </div>

 
    </div>




  );
};

export default Profile;
