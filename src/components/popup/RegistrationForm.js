import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AuthContext} from "../../context/AuthContext";
import {
  addDoc,
    collection,
    serverTimestamp
  } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { auth, db } from "../../firebase";
import { RMIUploader } from "react-multiple-image-uploader";
import ProgressBar from 'react-bootstrap/ProgressBar';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

function RegistrationForm({buttonName}) {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const [data, setData] = useState({});
  const {currentUser} = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [registerButton, setRegisterButton] = useState(false)
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const [file, setFile] = useState("");
  const [data2, setData2] = useState({});
  const [altinnData, setAltinnData] = useState([]);
  const [hiddenInput, setShowInput] = useState(true);
  const [hiddenInfoText, setShowInfoText] = useState(false);
  const postsCollectionRef = collection(db, "company");
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState([]);

  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
    setData(data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  const options = [
    { label: "Bilverksted", value: "Bilverksted" },
    { label: "Reprasjon", value: "Reprasjon" },
    { label: "Bilpleie", value: "Bilpleie" },
    { label: "Mekanikk", value: "Mekanikk" },
    { label: "Lakering", value: "Lakering" }
    
];
  const handleChange = async event => {
    setSearchTerm(event.target.value);
    
    }
   // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { openingDays: "", openingHours: "" }]);
  };
 
    
    
    const handleSubmit = async event => {
    event.preventDefault();
    fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      setAltinnData(data)
      
    
    })
    setShowInput(false)
    setShowInfoText(true)
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
           
              <Modal.Title>Data fra Enhetsregisteret</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
            <ProgressBar now={10} />
              {/* First page of the form */}

              <form onSubmit={handleSubmit}>
    
    <div className="col-md-12" key='orgNumber'><label className="labels">Organisasjonsnummer</label>
    <input type="text" id="orgNumber"  value={searchTerm} className="form-control" placeholder="000000000"  onChange={handleChange}/></div>
    <div className='row'>
        <div className="col-md-12 mt-4 text-center">
  <button type="submit" className="btn btn-primary profile-button">Hent data</button>
  </div></div>

<div hidden={hiddenInfoText}>
  <h4 className='text-center'>Hvorfor data fra Enhetsregisteret?</h4>
  <p>Denne informasjonen bruker vi til å verfisere bedriftsinformasjon. 
    Det er for å unngå misforståelser og identitetstyveri.
    <br/>
    Denne informasjon vil ikke være synlig for dine kunder.
  </p>
</div>
    

    
    <div className="row">
       
        
        
        <div className="col-md-5 border-right">
        
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-6">
                    {/* <h4 className="text-right">Resultat:</h4> */}
                </div>
                
                <div className="col mt-12">
             
                    <div className="col" >
                      <label className="labels" hidden={hiddenInput}>Bedriftsnavn</label>
                    <input type="text" id ="companyName" className="form-control"   hidden={hiddenInput}  value={altinnData.navn} onChange={handleInput}/>
                    </div>

                    <div className="col" >
                      <label className="labels" hidden={hiddenInput} >Ansatte</label>
                    <input  type="text" id="employees" className="form-control"  hidden={hiddenInput}  value={altinnData.antallAnsatte} onChange={handleInput}/>
                    </div>

                </div>
                <div className="row mt-3">
                    {/* <div className="col-md-12" ><label className="labels" hidden={hiddenInput}>Organisasjonsform</label>
                    <input type="text" id="beskrivelse" className="form-control" placeholder="bedriftsnavn ..."  hidden={hiddenInput}  value={altinnData.organisasjonsform.beskrivelse} onChange={handleInput}/></div>
                     */}
                   
                    
                    <div className="col-md-12"><label className="labels" hidden={hiddenInput}>Stiftelsesdato</label>
                    <input  id ="registrastionDate"type="text" className="form-control" hidden={hiddenInput}  value={altinnData.stiftelsesdato} onChange={handleInput}/></div>
                    
                   </div>
                <div className='row mt-3'>
                
                
          
                </div>
                
            </div>
          
        </div>
        
      <div className="col-md-4">
            <div className="p-3 py-5">
               
                <br/>
                
            </div>
                
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
              <Modal.Title>Register bedriftsinformasjon</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
             
              <h4 className='text-center'>Viktigheten med å utfylle dette skjemaet</h4>
              <img className="rounded mx-auto d-block" src='https://cdni.iconscout.com/illustration/premium/thumb/online-registration-form-5061840-4221899.png' alt=''/>
              <p className='text-center'>Å fylle ut et selskapsinformasjonsskjema er en viktig oppgave som kan få betydelige konsekvenser for din virksomhet. 
              </p>
              <p className='text-center'>
              Nøyaktig og oppdatert informasjon om din bedrift er avgjørende for dine kunder og for plattformens søkeresultater. 
             
              Unøyaktig eller ufullstendig bedriftsinformasjon kan føre til misforståelser eller mistillit blant kundene dine, og det kan også påvirke bedriftens synlighet på plattformen negativt. 
              <br/>
              Kunder kan ha mindre sannsynlighet for å gjøre forretninger med deg hvis de ikke klarer å finne nøyaktig informasjon om bedriften din, 
              og din bedrift kan ha mindre sannsynlighet for å vises i søkeresultater hvis plattformens algoritmer ikke har fullstendig og nøyaktig informasjon om bedriften din.
             <br/>
              Derfor er det viktig å lese og følge alle instruksjoner nøye når du fyller ut selskapsinformasjonsskjemaet. Sørg for å gi nøyaktig og oppdatert informasjon, og dobbeltsjekk arbeidet ditt før du sender inn skjemaet.
              <br/>
              Unnlatelse av å fylle ut skjemaet nøyaktig eller i tide kan få alvorlige konsekvenser for virksomheten din, som tapte kunder eller tapte muligheter.
              </p>
              <p className='text-center'>
              Oppsummert er det avgjørende å fylle ut selskapsinformasjonsskjemaet riktig og i tide for å sikre at kundene dine har den informasjonen de trenger og for å maksimere din bedrifts synlighet på plattformen.
       
              Det er viktig å ta deg tid til å fylle ut skjemaet nøye og nøyaktig for å unngå potensielle problemer eller forsinkelser.
              </p>

              <p className='text-center'> DENNE INFORMASJOENEN VIL VÆRE SYNLIG FOR DINE KUNDER</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Tilbake
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Gå videre
              </Button>
            </Modal.Footer>
          </>
        )}
        {page === 3 && (
          <>
            <Modal.Header closeButton>
            
              <Modal.Title>Register bedriftsinformasjon 1/3</Modal.Title>
            
            </Modal.Header>
            <Modal.Body>
            <ProgressBar now={40} />
            <div className="">
        
        <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-6">
               
            </div>
            <img 
              src={
                
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="" className="rounded mx-auto d-block rounded-circle mt-5" width="150px" 
            />
            
                    {/* <span className="font-weight-bold">Bedriftslogo</span><span> </span> */}
                    <div className="col text-center" style={{paddingBottom:'20px'}}>
                    
                    <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
        </div>
            <div className="row mt-2">
                <div className="col-md-6" key='orgNumber'><label className="labels">Org. nummer</label>
                <input type="text" id="orgNumber" className="form-control" placeholder="org. nummer ..."  /></div>

                <div className="col-md-6" key='CEO'><label className="labels">Dagligleder</label>
                <input type="text" id ="CEO" className="form-control"  placeholder="dagligleder ..." /></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-6" key='companyName'><label className="labels">Bedriftsnavn</label>
                <input type="text" id="companyName" className="form-control" placeholder="bedriftsnavn ..." /></div>
                
                <div className="col-md-6" key='email'><label className="labels">E-post</label>
                <input  type="text" id="email" className="form-control" placeholder="epost ..."  /></div>
           </div>    
            <div className="row mt-2">
                <div className="col-md-6" key='phoneNumber'><label className="labels">Telefon nummer</label>
                <input  id ="phoneNumber"type="text" className="form-control" placeholder="telefon ..." /></div>
                
                <div className="col-md-6" key='country'><label className="labels">Land</label>
                <input type="text" id ="country"  className="form-control" placeholder="land ..."/></div>
            </div>
            <div className="row mt-2">
                <div className="col-md-6" key='address'><label className="labels">Adresse</label>
                <input type="text" id ="address" className="form-control" placeholder="adresse ..."  /></div>

                <div className="col-md-3" key='state'><label className="labels">Sted</label>
                <input type="text" id ="address" className="form-control" placeholder="Oslo"  /></div>
                
                <div className="col-md-3" key='zipCode'><label className="labels">Postnummer</label>
                <input type="text" id ="facebook" className="form-control" placeholder="0000" /></div>
            </div>    
            
      
<div className="formInput" key='tags'>
<div className="col-md" key='about'><label className="labels">Bransje</label>
<select multiple  class="form-control" id="exampleFormControlSelect2" key={options.value} >
{options.map((e) =>
    <option id={e.label} value={e.value}> {e.value}</option>
    )}
    </select>
    </div> 
    <div className="" style={{margin:'10px'}}>
    <input  type="radio" class="form-check-input " id="exampleCheck1"/>
    <label style={{paddingLeft:'10px'}} class="col-md-3 form-check-label" for="exampleCheck1">Utfører arbeid for lastebiler?</label>
    <input type="radio" class="form-check-input" id="exampleCheck1"/>
    <label style={{paddingLeft:'10px'}} class=" col-md-4 form-check-label" for="exampleCheck1">Leverer du faste avtaler for bedrifter?</label>
    </div>

              </div>

           
            
            
        </div>
      
    </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Tilbake
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Gå videre
              </Button>
            </Modal.Footer>
          </>
        )}
        
        {page === 4 && (
          <>
            <Modal.Header closeButton>
            <Modal.Title>Register bedriftsinformasjon 2/3</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ProgressBar now={70} />


            <div className="row mt-2">

<div className="col-md-3" key='website'><label className="labels">Nettside</label>
<input type="text" id ="website" className="form-control" placeholder="www.nettside.no"  /></div>

<div className="col-md-3" key='instagram'><label className="labels">Instagram</label>
<input type="text"  id ="instagram" className="form-control" placeholder="@instagram" /></div>



<div className="col-md-3" key='facebook'><label className="labels">Facebook</label>
<input type="text" id ="facebook" className="form-control" placeholder="www.facebook.com"  /></div>

<div className="col-md-3" key='youtube'><label className="labels">Youtube</label>
<input type="text" id ="youtube" className="form-control" placeholder="www.youtube.com"  /></div>

</div>

{inputList.map((x, i) => {
        return (
          <div className="row mt-2">
            <div className="col-md-5" key='opningDays'><label className="labels">Dag</label>
            <input
              name="opningDays"
              placeholder="Dag eks. Mandag "
              className='form-control'
              value={x.openingDays}
              onChange={e => handleInputChange(e, i)}
            />
            </div>
            <div className="col-md-5" key='opningDays'><label className="labels">Åpnings- stengetid</label>
            <input
              className='form-control'
              name="opningHours"
   placeholder="Åpningstid eks. 10:00-20:00"
              value={x.openingHours}
              onChange={e => handleInputChange(e, i)}
            />
            </div>
            <div className="col-md-2 border-end  d-flex justify-content-left align-items-center"  key='opningDays' style={{ display: "flex", justifyContent: "start" }}>
              {inputList.length !== 1 && <DeleteIcon
                className="mr10"
                onClick={() => handleRemoveClick(i)}/>}
              {inputList.length - 1 === i && <AddBoxIcon onClick={handleAddClick}/>}
            </div>
          </div>
        );
      })}
    

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Tilbake
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Gå videre
              </Button>
            </Modal.Footer>
          </>
        )}

{page === 5 && (
          <>
            <Modal.Header closeButton>
            <Modal.Title>Register bedriftsinformasjon 3/3</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ProgressBar now={100} />




       <div className="row mt-3" >
                <div className="col-md" key='about'><label className="labels">Om oss</label>
                <textarea type="text" className="form-control" style={{height:'200px'}} placeholder="Om oss ...." id="about" /></div>
                
            </div>
            <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
        dataSources={imageData}
      />


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Tilbake
              </Button>
              <Button variant="primary">
                Lagre
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
export default RegistrationForm;
