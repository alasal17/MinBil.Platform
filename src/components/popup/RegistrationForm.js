import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext} from "../../context/AuthContext";
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


function RegistrationForm({buttonName}) {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const [data, setData] = useState({});
  const {currentUser} = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [registerButton, setRegisterButton] = useState(false)

  const [isData, setIsData] = useState('')
  const [visitorsData, setVisitorData] = useState('')
  const [file, setFile] = useState("");
  const [data2, setData2] = useState({});
  const [per, setPerc] = useState(null);
  const [altinnData, setAltinnData] = useState([]);

  const postsCollectionRef = collection(db, "company");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

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

    const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;
  
      setData2({ ...data2, [id]:value})
  
     
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonName}
      </Button>

      <Modal show={show} onHide={handleClose}>
        {page === 1 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* First page of the form */}

              <form onSubmit={handleSubmit}>
    
    <div className="col-md-12" key='orgNumber'><label className="labels">Org. nummer</label>
    <input type="text" id="orgNumber"  value={searchTerm} className="form-control" placeholder="org. nummer ..."  onChange={handleChange}/></div>
    <div className='row'>
        <div className="col-md-12 mt-4 text-center">
  <button type="submit" className="btn btn-primary profile-button">Hent data</button>
  </div></div>
  </form>
    

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
             
                    <div className="col-md-12" ><label className="labels">Dagligleder</label>
                    <input type="text" id ="CEO" required={true} className="form-control"  placeholder="dagligleder ..."  onChange={handleInput}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12" ><label className="labels">Bedriftsnavn</label>
                    <input type="text" id="companyName" className="form-control" placeholder="bedriftsnavn ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12" ><label className="labels">E-post</label>
                    <input  type="text" id="email" className="form-control" placeholder="epost ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12"><label className="labels">Telefon nummer</label>
                    <input  id ="phoneNumber"type="text" className="form-control" placeholder="telefon ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12"><label className="labels">Land</label>
                    <input type="text" id ="country"  className="form-control" placeholder="land ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12"><label className="labels">Adresse</label>
                    <input type="text" id ="address" className="form-control" placeholder="adresse ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12" ><label className="labels">Facebook</label>
                    <input type="text" id ="facebook" className="form-control" placeholder="facebook ..."onChange={handleInput}  /></div>
                    
                    <div className="col-md-12"><label className="labels">Instagram</label>
                    <input type="text"  id ="instagram" className="form-control" placeholder="instagram ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='website'><label className="labels">Rolle</label>
                    <input type="text" id ="website" className="form-control" placeholder="Bilverksted ..." onChange={handleInput} /></div>

                    <div className="col-md-12" ><label className="labels">LinkedIn</label>
                    <input type="text" id ="linkedin" className="form-control" placeholder="linkedin ..." onChange={handleInput} /></div>

                </div>
                <div className="row mt-3" >
                    <div className="col-md" key='about'><label className="labels">Om oss</label>
                    <textarea type="text" className="form-control" placeholder="Om oss ...." id="about" onChange={handleInput}/></div>
                    
                </div>
                <div className='row mt-3'>
                
                
                
                {/* <div className="col-md-6 mt-4 text-center">
                  <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                  </div>
                <div className="col-md-6 mt-4 text-center">
                <button className="btn btn-primary profile-button" type="button" onClick={ e => setRegisterButton(false)}>
                Avslutt</button></div> */}
                </div>
                
            </div>
          
        </div>
        
      <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Data hentet ifra Enhetsregisteret</span>
                {/* <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus">
                    </i>&nbsp;Experience
                    </span> */}
                    </div>
                <br/>
                
            </div>
                 {/* <div className="col-md-12"><label className="labels">Adresse</label>

                 <input type="text" readOnly={true} className="form-control" placeholder="experience" value={altinnData.forretningsadresse.adresse}/></div>  */}

                 {/* <div className="col-md-12"><label className="labels">Virkesomhet beskrivelse</label>

                 <input type="text" readOnly={true} className="form-control" placeholder="experience" value={altinnData.forretningsadresse}/></div>  */}
{/* 
                 <div className="col-md-12"><label className="labels">Antall ansatte</label>

                 <input type="text" readOnly={true} className="form-control" placeholder="experience" defaultValue={altinnData.antallAnsatte}/></div> 
                <input type="text" className="form-control" placeholder="additional details" /> */}
                </div>
            </div>
    
   
    </form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Next
              </Button>
            </Modal.Footer>
          </>
        )}
        {page === 2 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Second page of the form */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Previous
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Next
              </Button>
            </Modal.Footer>
          </>
        )}
        {page === 3 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Third page of the form */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Previous
              </Button>
              <Button variant="primary">
                Submit
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
export default RegistrationForm;
