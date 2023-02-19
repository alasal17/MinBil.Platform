


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


function AddServices({ buttonName }) {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const [registerButton, setRegisterButton] = useState(false);

  const [enhetsRegisteretAPIData, setEnhetsRegisteretAPIData] = useState([]);
  const [enhetsRegisteretData, setEnhetsRegisteretData] = useState([]);
  const [data2, setData2] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState([]);
  const postsCollectionRef = collection(db, "enhetsRegisteret");
  const [per, setPerc] = useState(null);
  const [hiddenInfoText, setShowInfoText] = useState(false);
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
    { label: "Reparasjon", value: "Reparasjon" },
    { label: "Polering", value: "Polering" },
    { label: "Bilpleie", value: "Bilpleie" },
    { label: "Mekanikk", value: "Mekanikk" },
    { label: "Lakering", value: "Lakering" },
    { label: "Bilvask", value: "Bilvask" },
    { label: "Dekk & Felg", value: "Dekk & Felg" },
    { label: "EU-Kontroll", value: "EU-Kontroll" },
    { label: "AC-Service", value: "AC-Service" },
  ];


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // ------------- FOR CALLING enhetsRegisteret DB -----------------
   useEffect(() => {
    // LISTEN (REALTIME)

    
    

   
  }, );
 

  const handleCompaniesAgreementsChange = () => {
    setPackageService(!packageService);
  };

  const handlePerformsTrucksChange = () => {
    setPerformsTrucks(!performsTrucks);
  };


  // ------------- HADNLE FOR NEXT PAGE : WRONG ---> setSocialMedia -----------------
  const handleNextPage2 = ({}) => {
    setPage(page + 1);
      
   
  };

  const handleSelectedNextPage = () => {

    // const formSelected = document.getElementsByName('service');
    setPage(3)
    // {formSelected.forEach((e) =>      
    
    //   {if(e.value === 'Bilvask'){
    //     setPage(3)
    //     console.log(page)
    //   }else if (e.value === 'Reparasjon'){
    //     setPage(4)
    //     console.log(page)
    //   }
    //   else{
    //     console.log('not')
    //   }}
      
      
    //   )}
      
   
  };
  // ------------- HADNLE FOR PREV PAGE ----------------
  const handlePrevPage = () => setPage(page - 1);



  // ######### WORNG
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;


 
    setData({ ...data, [id]: value, orgNumber: searchTerm });
  };





  // const openingHoursErrorMessage = (
   
  // );
  

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
        
          
          {page === 1 && (
            <>
              <Modal.Header >
                <Modal.Title className="formMainLable">Register bedriftsinformasjon</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <h4 className="text-center">
                  Viktigheten med å utfylle dette skjemaet
                </h4>
                <img
                  className="rounded mx-auto d-block"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-form-5061840-4221899.png"
                  alt=""
                />
                <p className="text-center">
                  Å fylle ut et selskapsinformasjonsskjema er en viktig oppgave
                  som kan få betydelige konsekvenser for din virksomhet.
                </p>
                <p className="text-center">
                  Nøyaktig og oppdatert informasjon om din bedrift er avgjørende
                  for dine kunder og for plattformens søkeresultater. Unøyaktig
                  eller ufullstendig bedriftsinformasjon kan føre til
                  misforståelser eller mistillit blant kundene dine, og det kan
                  også påvirke bedriftens synlighet på plattformen negativt.
                  <br />
                  Kunder kan ha mindre sannsynlighet for å gjøre forretninger
                  med deg hvis de ikke klarer å finne nøyaktig informasjon om
                  bedriften din, og din bedrift kan ha mindre sannsynlighet for
                  å vises i søkeresultater hvis plattformens algoritmer ikke har
                  fullstendig og nøyaktig informasjon om bedriften din.
                  <br />
                  Derfor er det viktig å lese og følge alle instruksjoner nøye
                  når du fyller ut selskapsinformasjonsskjemaet. Sørg for å gi
                  nøyaktig og oppdatert informasjon, og dobbeltsjekk arbeidet
                  ditt før du sender inn skjemaet.
                  <br />
                  Unnlatelse av å fylle ut skjemaet nøyaktig eller i tide kan få
                  alvorlige konsekvenser for virksomheten din, som tapte kunder
                  eller tapte muligheter.
                </p>
                <p className="text-center">
                  Oppsummert er det avgjørende å fylle ut
                  selskapsinformasjonsskjemaet riktig og i tide for å sikre at
                  kundene dine har den informasjonen de trenger og for å
                  maksimere din bedrifts synlighet på plattformen. Det er viktig
                  å ta deg tid til å fylle ut skjemaet nøye og nøyaktig for å
                  unngå potensielle problemer eller forsinkelser.
                </p>

                <p className="text-center">
                  {" "}
                  DENNE INFORMASJOENEN VIL VÆRE SYNLIG FOR DINE KUNDER
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
                      Gå videre
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          )}
          {page === 2 && (
            <>
              <Modal.Header >
                <Modal.Title className="formMainLable">Page 2</Modal.Title>
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
                          
                          id="service"
                          placeholder="Tjeneste..."
                 
                          onChange={(value) =>
                            setIndustryData(value.label)
                            }
                          
                          options={options}
                          name="service"
                        />
                 
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="modalFotterCompanyForm">
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary" onClick={handlePrevPage}>Tilbake</Button>
                    </div>
                    <div className="col">
                      <Button
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
          {page === 3 && (
            <>
               <CarWashPackages buttonName={'Bil vask'}/>
            </>
          )}
          {page === 4 && (
            <>
             {/* <Repair buttonName={'Reprasjon'}/> */}
             <h1>Page 4</h1>
            </>
          )}
          {page === 5 && (
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
