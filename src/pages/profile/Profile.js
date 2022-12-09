
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import React, { useState, useEffect, useContext }   from 'react';
import {
  addDoc,
    collection,
    onSnapshot,
    query, 
    where,
    serverTimestamp
  } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { auth, db, storage } from "../../firebase";
import { AuthContext} from "../../context/AuthContext";

import Popup from "../../components/popup/Popup";


import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Profile = () => {
   
    const [data, setData] = useState({});
    const {currentUser} = useContext(AuthContext)

    const [registerButton, setRegisterButton] = useState(false)

    const [isData, setIsData] = useState('')
    const [visitorsData, setVisitorData] = useState('')
    const [file, setFile] = useState("");
    const [data2, setData2] = useState({});
    const [per, setPerc] = useState(null);

    const postsCollectionRef = collection(db, "company");
 
 
    useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      
      query(collection(db, "company"), where("uid", "==", currentUser.uid)),
      (snapShot) => {
        if(snapShot.docs !== ''){
        snapShot.docs.map((doc) => {
          setData({uid:doc.data().uid,
             companyName: doc.data().companyName,
              companyLogo:doc.data().companyLogo,
               email:doc.data().email,
               address:doc.data().address,
               country:doc.data().country,
               phoneNumber:doc.data().phoneNumber,
               about: doc.data().about,
              //  role: doc.data().role.replace(/[0-9.]/g, ''),
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
                          
          });}
          

          // snapShot.docs.map((doc) => {
          //   setOpeningDays({
          //        mandag:doc.data().openingHours[0],
          //        tirsdag:doc.data().openingHours[1],
          //        onsdag:doc.data().openingHours[2],
          //        torsdag:doc.data().openingHours[3],
          //        fredag:doc.data().openingHours[4],
          //        lørdag:doc.data().openingHours[5],
          //        søndag:doc.data().openingHours[6]
              
          //        });
                            
          //   });


            if(data.companyName == null || data.companyName === ''){
              
              
             return (
              
            
               setIsData(
               <div>
                <div className="col-sm-12">
                      <button className="btn btn-info "  onClick={() => setRegisterButton(true)}>Registrer deg</button>
                    </div>
                </div>)
                ,

                setVisitorData(<div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Mest besøkende</i>Tilbud</h6>
                      <small>Dekkskift</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Bilvask</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Polering</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Lakering</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Sandblås</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Mest besøkende</i>Produkter</h6>
                      <small>Dekkskift</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Ruteskift</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Motorvask</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Bilvask</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>EU-kontroll</small>
                      <div className="progress mb-3" style={{height: "5px"}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "0%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
                )
              
            }
            else{
              return(
                
               setIsData(
                <div>
                 <div className="col-sm-12">
                       <button className="btn btn-info " onClick={() => setRegisterButton(true)}>Endre</button>
                     </div>
                 </div>),

              setVisitorData(<div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Mest besøkende</i>Tilbud</h6>
                    <small>Dekkskift</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Bilvask</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Polering</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Lakering</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Sandblås</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Mest besøkende</i>Produkter</h6>
                    <small>Dekkskift</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "60%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Ruteskift</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "22%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Motorvask</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "19%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Bilvask</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>EU-kontroll</small>
                    <div className="progress mb-3" style={{height: "5px"}}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
              )
            }

            
          
      },
      (error) => {
        console.log(error);
      }
    );
  
  

    return () => {
      unsub();
    };
  }, );
  
  
  useEffect(() => {
    setTimeout = (() => {
      if(data.companyName == null || data.companyName === ''){
        setRegisterButton(true)
      },3000);
      }, []);
  
  
  

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
      
      <Sidebar />
      
      <div className="singleContainer">
        <Navbar />
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
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">{data.website}</span>
                  </li>
                  {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span className="text-secondary">bootdey</span>
                  </li> */}
                  {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">@bootdey</span>
                  </li> */}
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span className="text-secondary">{data.instagram}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
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
                  {/* <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Org. nummer</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (320) 380-4539
                    </div>
                  </div> */}
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

              
{visitorsData}


            </div>
          </div>

        </div>
    </div>


    </div></div>
    </div>

    <Popup trigger={registerButton} setTrigger={setRegisterButton}> 
    <form onSubmit={handleAdd}>
    <div className="row">
        <div className="col-md-3 border-right">
        
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img 
              src={
                
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
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
                onChange={(e) => setFile(e.target.files[0])}
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
                    <input type="text" id="orgNumber" className="form-control" placeholder="org. nummer ..."  onChange={handleInput}/></div>

                    <div className="col-md-6" key='CEO'><label className="labels">Dagligleder</label>
                    <input type="text" id ="CEO" className="form-control"  placeholder="dagligleder ..."  onChange={handleInput}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12" key='companyName'><label className="labels">Bedriftsnavn</label>
                    <input type="text" id="companyName" className="form-control" placeholder="bedriftsnavn ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='email'><label className="labels">E-post</label>
                    <input  type="text" id="email" className="form-control" placeholder="epost ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='phoneNumber'><label className="labels">Telefon nummer</label>
                    <input  id ="phoneNumber"type="text" className="form-control" placeholder="telefon ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='country'><label className="labels">Land</label>
                    <input type="text" id ="country"  className="form-control" placeholder="land ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='address'><label className="labels">Adresse</label>
                    <input type="text" id ="address" className="form-control" placeholder="adresse ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='facebook'><label className="labels">Facebook</label>
                    <input type="text" id ="facebook" className="form-control" placeholder="facebook ..."onChange={handleInput}  /></div>
                    
                    <div className="col-md-12" key='instagram'><label className="labels">Instagram</label>
                    <input type="text"  id ="instagram" className="form-control" placeholder="instagram ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='website'><label className="labels">Nettside</label>
                    <input type="text" id ="website" className="form-control" placeholder="nettside ..." onChange={handleInput} /></div>
                
                </div>
                <div className="row mt-3" >
                    <div className="col-md" key='about'><label className="labels">Om oss</label>
                    <textarea type="text" className="form-control" placeholder="Om oss ...." id="about" onChange={handleInput}/></div>
                    
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




  );
};

export default Profile;
