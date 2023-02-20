


import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import {
  doc,
  collection,
  serverTimestamp,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { RMIUploader } from "react-multiple-image-uploader";
import ProgressBar from "react-bootstrap/ProgressBar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../components/popup/registrationForm.css";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Await, useNavigate } from "react-router-dom";
import CarWashPackages from "./CarWashPackages";
import Repair from "./Repair";
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function AddServices({ buttonName }) {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [hiddenInfoText, setShowInfoText] = useState(false);

  const [showStartButton, setShowStartButton] = useState(true);

  const [enhetsRegisteretAPIData, setEnhetsRegisteretAPIData] = useState([]);
  const [enhetsRegisteretData, setEnhetsRegisteretData] = useState([]);
  const [data2, setData2] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState([]);
  const [per, setPerc] = useState(null);
  const [hiddenWorkshopCheckBox, setHiddenWorkshopCheckBox] = useState(true);
  const [firstFormValidated, setFirstFormValidated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showData, setShowData] = useState();
  const [file, setFile] = useState("");
  const areAllFieldsFilled = !(searchTerm === "") & !(searchTerm === undefined);
  const dataIsNotEmpty =
    (enhetsRegisteretAPIData.length !== 0) & (areAllFieldsFilled !== true);
  const [industryData, setIndustryData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [country, setCountry] = useState([]);

  const [imagesData, setImagesData] = useState([]);
  const [imagesData2, setImagesData2] = useState([]);
  const [recommendedSocialMedia, setRecommendedSocialMedia] = useState(false);
  const [recommendedOpeningDays, setRecommendedOpeningDays] = useState(false);
  const [recommendedAboutUs, setRecommendedAboutUs] = useState(false);
  const [recommendedColor, setRecommendedColor] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    website: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });
  const [packageService, setPackageService] = useState(true);
  const [serviceOnDiscountm, serServiceOnDiscount] = useState(true);
  const [performsTrucks, setPerformsTrucks] = useState(false);
  const [aboutUs, setAboutUs] = useState([]);
  const regx = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  const [addFieldIcon, setAddFieldIcon] = useState(false);
  const [openingHoursError, setOpeningHoursError] = useState(true);
  const [days, setDays] = useState([{day: "", open: "", close: ""}]);
  const [days2, setDays2] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);
  // };



  const options = [
    { label: "Reparasjon og vedlikehold av kjøretøy", value: "Reparasjon og vedlikehold av kjøretøy" },
    { label: "Bilpleietjenester", value: "Bilpleietjenester" },
    // { label: "Bilpleie", value: "Bilpleie" },
    // { label: "Mekanikk", value: "Mekanikk" },
    // { label: "Lakering", value: "Lakering" },
    // { label: "Bilvask", value: "Bilvask" },
    { label: "Dekk & Felg", value: "Dekk & Felg" },
    { label: "EU-Kontroll", value: "EU-Kontroll" },

  ];


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // ------------- FOR CALLING enhetsRegisteret DB -----------------

  const handleWorkShopChange = () => {
    setHiddenWorkshopCheckBox(!hiddenWorkshopCheckBox);
  };

  const handlePrevPageAfterServices = () => {
    setPage(1);
  };

  const handlePerformsTrucksChange = () => {
    setPerformsTrucks(!performsTrucks);
  };

  // ------------- HADNLE FOR NEXT PAGE : WRONG ---> setSocialMedia -----------------
  const handleNextPage2 = ({}) => {
    setPage(1);
      
   
  };

  const handleSelectedNextPage = () => {
    
    const formSelected = document.getElementsByName('select_service');
   
    {formSelected.forEach((e) =>      
    
      {if(e.value === 'Bilpleietjenester'){
        setPage(2)
        setShowStartButton(false)
      }else if (e.value === 'Reparasjon og vedlikehold av kjøretøy'){
        setPage(3)
        setShowStartButton(false)
        console.log(page)
      }
      else{
        console.log('not')
        setShowStartButton(true)
      }}
      
      
      )}
      
   
  };

  // ------------- HADNLE FOR PREV PAGE ----------------
  const handlePrevPage = () => {
    setPage(page - 1);
    setIndustryData('')
  };

  // ######### FOR WORKSHOP SERVICES
  useEffect(() => {
    const formSelected = document.getElementsByName('select_service');
    console.log(industryData)
    if(industryData === 'Bilpleietjenester'){
      setShowStartButton(false)
        setHiddenWorkshopCheckBox(true)
      }else if (industryData === 'Reparasjon og vedlikehold av kjøretøy'){
      
        setHiddenWorkshopCheckBox(false)
        setShowStartButton(false)
      }
      else{
        setHiddenWorkshopCheckBox(true)
        console.log('Else')
        setShowStartButton(true)
      }
  }, );

const popPageFourInfo = (
  <Popover id="popover-basic" >
    <Popover.Header className="formInfoRecommention" as="h3">Sosiale medier</Popover.Header>
    <Popover.Body>
      Vi <strong>anbefaler</strong> at du fyller inn dataen for dine sosiale medier og nettside.   
    <br/>  Det vil øker intressen hos dine kunder.    </Popover.Body>
    <br/>
      

    <Popover.Header className="formInfoRequered" as="h3">Åpningstider (obligatorisk)</Popover.Header>
    <Popover.Body>
     Fyll inn tiden for alle dagene i uka. man-søn.</Popover.Body>

 
  </Popover>
);
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonName}
      </Button>

      <div>
        <Modal 
        show={show} 
        onHide={handleClose} 
        animation={true} 
        autoFocus={true}
        className='customModal'>
        
          
          {/* {page === 1 && (
            <>
              <Modal.Header >
                <Modal.Title className="formMainLable">Register av Tjeneste</Modal.Title>
              </Modal.Header>

              <Modal.Body>
            
                <img
                  className="rounded mx-auto d-block"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-form-5061840-4221899.png"
                  alt=""
                />
   
                <p className="text-center">
                Det er viktig at du fyller ut riktig informasjon på dette skjemaet for å sikre at vi nøyaktig kan 
                representere virksomheten din og dens tjenester til potensielle kunder. 
                Denne informasjonen vil også bli brukt til å hjelpe oss med å skreddersy tjenestene våre for 
                å møte dine forretningsbehov.
                <br/>
                Vennligst ta deg tid til å fylle ut dette skjemaet i sin helhet og gi så mange detaljer som mulig. 
                Hvis du har spørsmål eller bekymringer angående skjemaet, ikke nøl med å kontakte oss for å få hjelp.
                </p>
              

           
              </Modal.Body>
              <Modal.Footer>
                <div className="row ">
               
                  <div className="col">
                    <Button
                      variant="primary"
                      style={{ height: "auto", width: "100px" }}
                      onClick={handleNextPage2}
                    >
                      Start
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          )} */}
          {page === 1 && (
            <>
              <Modal.Header >
                <Modal.Title className="formMainLable">
                  Velg tjeneste
                  <span hidden={hiddenWorkshopCheckBox}>
                <OverlayTrigger
                    key={'right'}
                    placement={'right'}
                    overlay={popPageFourInfo}
            >  
                  <ErrorOutlineTwoToneIcon className="formMainLableInfo" style={{left: '95%',  position: 'absolute'}}/>
                  </OverlayTrigger>
                </span>
                </Modal.Title>
              </Modal.Header>
              <form >
                <Modal.Body>
      
                  <div className="">
                  
                   
                   


                    <div className="row mt-2">
                      <div className="col-md-12" key="service">
                        <label className="labels">
                          Velg tjeneste 
                        </label>

                        <Select
                          
                          id="select_service"
                          placeholder="Tjeneste..."
                 
                          onChange={(value) =>
                            setIndustryData(value.label)
                            }
              
                          options={options}
                          name="select_service"
                   
                        />
                 
                      </div>
             
                     
                    </div>

                    {/* <div className="row mt-2" hidden={hiddenWorkshopCheckBox}>
                      <div className="col-md-12" key="service">
                 
           <h4 className="text-center" style={{ margin: "30px" }}>
                      Informasjon om skjemaet
                    </h4>
                <p className="text-center">
                Det er viktig at du fyller ut riktig informasjon på dette skjemaet for å sikre at vi nøyaktig kan 
                representere virksomheten din og dens tjenester til potensielle kunder. 
                Denne informasjonen vil også bli brukt til å hjelpe oss med å skreddersy tjenestene våre for 
                å møte dine forretningsbehov.
                <br/>
                Vennligst ta deg tid til å fylle ut dette skjemaet i sin helhet og gi så mange detaljer som mulig. 
                Hvis du har spørsmål eller bekymringer angående skjemaet, ikke nøl med å kontakte oss for å få hjelp.
                </p>

                <h6>Felter beksrivelse:</h6>

                <ListGroup as="ol"  style={{listStyleType: 'none', margin:'10px'}} >
                      
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Bilde</div>
                          Last opp/ generer ett bilde til tjenesten
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Tjeneste tittel</div>
                          For eksempel: <span  style={{fontStyle:'italic', color:'#818282'}}> Motorservice, Girkasseservice, Rutinemessig vedlikehold</span>
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Aktiv fra dato</div>
                          Aktiveringsdato for tjenesten.
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Estimert tid (i minutter)</div>
                          Hvor langt tid kan den tjeneste bruke. Bergnet i minutter. For eksempel: <span style={{fontStyle:'italic', color:'#818282'}}> 60 tilsvarer 1 time</span>
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Kapasitet (Antall plass biler)</div>
                          Antall plass av biler i verksted om gangen for denne tjenesten.
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Tilbyr bedriften lånebil</div>
                          Kryss av dersom bedriften tilbyr lånebil når kunden har bilen inne på service
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Leverer bedriften faste avtaler for bedrifter</div>
                          Kryss av dersom bedriften tilbyr faste avtaler til andre bedrifter for denne tjenesten?
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Tjeneste beskrivelse</div>
                          Skriv / generer en beskrivelse av tjenesten du tilbyr
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                          <div className="fw-bold" >Pris</div>
                          Skjemat har to former for prismodeller. <br/>1. Pakke priser <br/>2. Enkel pris eller pris basert på bil størrelse. 3 type størrelse (Pris liten bil, Pris normal bil, Pris stor bil)
                        </div>
                      </ListGroup.Item>

                </ListGroup>
                
             

                      </div>
                    </div> */}
                  
              
                
                
                  </div>
                
                </Modal.Body>
                <Modal.Footer className="modalFotterCompanyForm">
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary" onClick={handlePrevPage}>Tilbake</Button>
                    </div>
                    <div className="col">
                      <Button
                      disabled={showStartButton}
                        variant="primary"
                        style={{ height: "auto", width: "100px" }}
                        onClick={handleSelectedNextPage}
                        type={"submit"}
                      >
                        Gå videre
                      </Button>
                    </div>
                  </div>
                </Modal.Footer>
              </form>
            </>
          )}
          {page === 2 && (
            <>
            <CarWashPackages buttonName={'Bilpleietjenester'} prevPage={handlePrevPageAfterServices}/>
            </>
          )}
          {page === 3 && (
            <>
           <Repair buttonName={'Reparasjon og vedlikehold av kjøretøy'} prevPage={handlePrevPageAfterServices}/> 
          
            </>
          )}
          {page === 4 && (
            <>
           <div>
            <h1>5</h1>
           </div>
            </>
          )}

        </Modal>
      </div>
    </>
  );
}
export default AddServices;
