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
  const [hiddenInput, setShowInput] = useState(true)
  const postsCollectionRef = collection(db, "company");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  const handleChange = async event => {
    setSearchTerm(event.target.value);
    setShowInput(false)
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
              <Modal.Title>Registeringsskjema</Modal.Title>
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

    

    
    <div className="row">
       
        
        
        <div className="col-md-5 border-right">
        
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Data fra Enhetsregisteret</h4>
                </div>
                
                <div className="row mt-2">
             
                    <div className="col-md-12" ><label className="labels" hidden={hiddenInput}>Bedriftsnavn</label>
                    <input type="text" id ="companyName" className="form-control"  placeholder="Bilpleie..." hidden={hiddenInput}  value={altinnData.navn} onChange={handleInput}/></div>
                </div>
                <div className="row mt-3">
                    {/* <div className="col-md-12" ><label className="labels" hidden={hiddenInput}>Organisasjonsform</label>
                    <input type="text" id="beskrivelse" className="form-control" placeholder="bedriftsnavn ..."  hidden={hiddenInput}  value={altinnData.organisasjonsform.beskrivelse} onChange={handleInput}/></div>
                     */}
                    <div className="col-md-12" ><label className="labels" hidden={hiddenInput} >Ansatte</label>
                    <input  type="text" id="email" className="form-control" placeholder="epost ..."  hidden={hiddenInput}  value={altinnData.antallAnsatte} onChange={handleInput}/></div>
                    
                    <div className="col-md-12"><label className="labels" hidden={hiddenInput}>Stiftelsesdato</label>
                    <input  id ="phoneNumber"type="text" className="form-control" placeholder="telefon ..."hidden={hiddenInput}  value={altinnData.stiftelsesdato} onChange={handleInput}/></div>
                    
                    {/* <div className="col-md-12"><label className="labels" hidden={hiddenInput}>Land</label>
                    <input type="text" id ="country"  className="form-control" hidden={hiddenInput}  value={altinnData.forretningsadresse.land} onChange={handleInput}/></div> */}
                    
                    <div className="col-md-12"><label className="labels" hidden={hiddenInput}>Adresse</label>
                    <input type="text" id ="address" className="form-control"hidden={hiddenInput}  onChange={handleInput}/></div>
                    
                    {/* <div className="col-md-12" ><label className="labels" hidden={hiddenInput}>Facebook</label>
                    <input type="text" id ="facebook" className="form-control" hidden={hiddenInput} placeholder="facebook ..."  value={altinnData.organisasjonsnummer} onChange={handleInput}  /></div>
                    
                    <div className="col-md-12"><label className="labels" hidden={hiddenInput}>Instagram</label>
                    <input type="text"  id ="instagram" className="form-control" hidden={hiddenInput} placeholder="instagram ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='website'><label className="labels" hidden={hiddenInput}>Rolle</label>
                    <input type="text" id ="website" className="form-control" placeholder="Bilverksted ..." hidden={hiddenInput} onChange={handleInput} /></div>

                    <div className="col-md-12" ><label className="labels" hidden={hiddenInput}>LinkedIn</label>
                    <input type="text" id ="linkedin" className="form-control" placeholder="linkedin ..." hidden={hiddenInput} onChange={handleInput} /></div>

                </div>
                <div className="row mt-3" >
                    <div className="col-md" key='about'><label className="labels" hidden={hiddenInput}>Om oss</label>
                    <textarea type="text" className="form-control" placeholder="Om oss ...." id="about"hidden={hiddenInput} onChange={handleInput}/></div>
                    
                 */}</div>
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
                Avslutt
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Gå videre
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
