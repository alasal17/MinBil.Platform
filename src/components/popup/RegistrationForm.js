// RegistrationForm.js
import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCompanyData } from "../../useCompanyData";
import { useUserTheme } from "../../useUserTheme";
import { fetchDocument } from "../../fetchData";

function RegistrationForm() {
  const [show, setShow] = useState(true); // Vis modal når komponenten rendres
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser.uid;
  const [per, setPerc] = useState(null);
  const [file, setFile] = useState("");
  const [industryData, setIndustryData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [socialMedia, setSocialMedia] = useState({
    website: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });
  const [addFieldIcon, setAddFieldIcon] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imagesData2, setImagesData2] = useState([]);
  const [recommendedOpeningDays, setRecommendedOpeningDays] = useState(false);
  const [registerButton, setRegisterButton] = useState(false);
  const [enhetsRegisteretData, setEnhetsRegisteretData] = useState([]);
  const [enhetsRegisteretAPIData, setEnhetsRegisteretAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [companiesAgreements, setCompaniesAgreements] = useState(false);
  const [performsTrucks, setPerformsTrucks] = useState(false);
  const [openingHours, setOpeningHours] = useState({});
  const [imagesData, setImagesData] = useState([]);
  const [page, setPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showData, setShowData] = useState();
  const areAllFieldsFilled = !(searchTerm === "") & !(searchTerm === undefined);
  const dataIsNotEmpty =
  (enhetsRegisteretAPIData.length !== 0) & (areAllFieldsFilled !== true);
  const [hiddenInfoText, setShowInfoText] = useState(false);
  const [days, setDays] = useState([{day: "", open: "", close: ""}]);
  const [days2, setDays2] = useState({});
  const [openingHoursError, setOpeningHoursError] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const options = [
    { label: "Bilverksted", value: "Bilverksted" },
    { label: "Reprasjon", value: "Reprasjon" },
    { label: "Bilpleie", value: "Bilpleie" },
    { label: "Mekanikk", value: "Mekanikk" },
    { label: "Lakering", value: "Lakering" },
  ];

  const countries = [
    { label: "Norge", value: "no" },
    { label: "Svergie", value: "se" },
    { label: "Danmark", value: "dk" },
    { label: "Island", value: "is" },
    { label: "Finland", value: "fi" },
  ];

  const hours = [
    { label: "06:00", value: "06:00" },
    { label: "07:00", value: "07:00" },
    { label: "08:00", value: "08:00" },
    { label: "09:00", value: "09:00" },
    { label: "10:00", value: "10:00" },
    { label: "11:00", value: "11:00" },
    { label: "12:00", value: "12:00" },
    { label: "13:00", value: "13:00" },
    { label: "14:00", value: "14:00" },
    { label: "15:00", value: "15:00" },
    { label: "16:00", value: "16:00" },
    { label: "17:00", value: "17:00" },
    { label: "18:00", value: "18:00" },
    { label: "19:00", value: "19:00" },
    { label: "20:00", value: "20:00" },
    { label: "21:00", value: "21:00" },
    { label: "22:00", value: "22:00" },
    { label: "23:00", value: "23:00" },
    { label: "00:00", value: "00:00" },
  ];
  const hours_list = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "Stengt"
  ];
  
  const dataSources = [
    {
      id: 1,
      dataURL:
        "https://finetuneauto.com/wp-content/uploads/2021/02/auto-repair-service.jpg",
    },
    {
      id: 2,
      dataURL:
        "https://d1gymyavdvyjgt.cloudfront.net/drive/images/uploads/headers/ws_cropper/1_0x0_790x520_0x520_car-service-checklist.jpg",
    },
    {
      id: 3,
      dataURL: "https://etimg.etb2bimg.com/photo/75526812.cms",
    },
    {
      id: 4,
      dataURL:
        "https://www.cannonautorepair.com/images/mechanic_with_customer.jpeg",
    },
    {
      id: 5,
      dataURL:
        "https://d1gymyavdvyjgt.cloudfront.net/drive/images/uploads/headers/ws_cropper/1_0x0_790x520_0x520_seven-signs-header.jpg",
    },
    {
      id: 6,
      dataURL:
        "https://www.choicequote.co.uk/wp-content/uploads/2013/06/mechanic-tablet-624x416.jpg",
    },
    {
      id: 7,
      dataURL:
        "https://www.carz.in/wp-content/uploads/2016/08/carz-electrical-and-mechanical.jpg",
    },
    {
      id: 8,
      dataURL:
        "https://motorhills.com/wp-content/uploads/2021/10/Car-mechanic-in-an-auto-repair-shop.jpg",
    },
    {
      id: 9,
      dataURL: "https://www.aaa.com/AAA/common/AAR/images/car_guide.jpg",
    },
  ];

  const weekDays = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag",
  ];

  const hideModal = () => {
    setVisible(false);
  };

  const handleImagesInput = (e) => {
    const list = [];
    const list2 = [];

    e.map((w) => {
      if (w.file) {
        if (!list.includes(w.dataURL)) {
          list.push(w.dataURL);
        } else {
          console.log("In list!");
        }
      } else {
        console.log("Not File");
        if (!list2.includes(w.dataURL)) {
          console.log("Not in list");
          list2.push(w.dataURL);
        } else {
          console.log("In list!");
        }
      }
    });

    setImagesData2(list2);
    setImagesData(list);
  };



const handleChangeBusnissHours = (e, index) => {

  const updatedDays = [...days];
  updatedDays[index][e.target.name] = e.target.value ?? '';
  setDays(updatedDays);
  days.map((e)=> {
    
    
    
})


}


const handleFacebookLogin = async () => {
 
  try {
    // const result = await auth().signInWithPopup(provider);
    // console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};

  // Oppdatering av `days2` basert på `days`
  useEffect(() => {
    if (days.length === 7) {
      setDays2({
        Mandag: { open: days[0].open || "", close: days[0].close || "" },
        Tirsdag: { open: days[1].open || "", close: days[1].close || "" },
        Onsdag: { open: days[2].open || "", close: days[2].close || "" },
        Torsdag: { open: days[3].open || "", close: days[3].close || "" },
        Fredag: { open: days[4].open || "", close: days[4].close || "" },
        Lørdag: { open: days[5].open || "", close: days[5].close || "" },
        Søndag: { open: days[6].open || "", close: days[6].close || "" },
      });
    }
  }, [days]);
const handleNextPagefem = () =>{
  if(days.length < 6){
    setPage(page)
    setOpeningHoursError(false)
    console.log('Under 7')
  }else{
    setOpeningHoursError(true)
    try{

      setDays2({'Mandag':{open:days[0].open || '', close:days[0].close || ''},
        'Tirsdag':{open:days[1].open ?? '', close:days[1].close || ''},
        'Onsdag':{open:days[2].open ?? '', close:days[2].close} ?? '',
        'Torsdag':{open:days[3].open || '', close:days[3].close || ''},
        'Fredag':{open:days[4].open || '', close:days[4].close} || '',
        'Lørdag':{open:days[5].open || '', close:days[5].close} || '',
        'Søndag':{open:days[6].open || '', close:days[6].close || ''}
        
        })

        setPage(page + 1)
      
      }catch (err) {
        console.log(err);
      }
  }
  
      
   
}


useEffect(() => {


 
  if(days.length < 7){
    setRecommendedOpeningDays(false);
    setAddFieldIcon(false)
  

  } 
  else if(days.length === 7){
    setAddFieldIcon(true)
    setOpeningHoursError(true)
    setRecommendedOpeningDays(true);
    console.log('else if')
  } else{
    setOpeningHoursError(true)
    setAddFieldIcon(false)
    console.log('else')
  }

  

})

const handleAddDay = () => {
}

const handleRemoveClick = index => {
};

  // ----------- FOR UPLOAD IMAGES -------------
  const onUpload = async (data) => {
  };



  const onRemove = (id) => {
    console.log("Remove image id", id);
  };


  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    navigate("/"); // Omdirigerer brukeren ved lukking av modal
  };

  // Last opp firmalogo
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, companyLogo: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  // Håndterer innsending av skjema
  const onSubmit = async () => {
    try {
      await setDoc(doc(db, "company", userID), {
        uid: userID,
        ...data,
        industryType: industryData,
        country: country,
        phoneNumber: phoneNumber,
        aboutUs: aboutUs,
        socialMedia: socialMedia,
        companiesAgreements: companiesAgreements,
        performsTrucks: performsTrucks,
        images: imagesData,
        openingHours: openingHours,
        createdAt: serverTimestamp(),
      });
      // Etter vellykket registrering kan du oppdatere tilstanden eller omdirigere
      navigate("/profile"); // Omdirigerer til profilsiden
    } catch (err) {
      console.log(err);
    }
  };

  // Håndterer neste side i skjemaet
  const handleNextPage = () => {
    setPage(page + 1);
    setProgress(progress + 25); // Oppdaterer fremdriftsindikatoren
  };

  // Håndterer forrige side i skjemaet
  const handlePrevPage = () => {
    setPage(page - 1);
    setProgress(progress - 25);
  };

   // ------------- SEARCH API. RETURNS DIFFENTES RENDERINGS RESUALT ----------------
   const handleAPIRequesest = async (event) => {
    event.preventDefault();
    fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setEnhetsRegisteretAPIData(data);
        console.log(enhetsRegisteretData);

        // CHECK IF 'data.organisasjonsnummer !== "" || data.organisasjonsnummer !== undefined'
        if (
          data.organisasjonsnummer !== "" ||
          data.organisasjonsnummer !== undefined
        ) {
          console.log(
            'data.organisasjonsnummer !== "" || data.organisasjonsnummer !== undefined'
          );
          // THis returns a filled out form
          return setShowData(
            <div className="row">
              <div className=" border-right">
                <div className="p-3 py-5">
                  <div className="row mt-2">
                    <div className="col-md-7">
                      <label className="labels">Bedriftsnavn</label>
                      <input
                        type="text"
                        id="companyName"
                        readOnly
                        className="form-control"
                        value={data.navn}
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="labels">
                        Registreringsdato Enhetsregisteret
                      </label>
                      <input
                        type="text"
                        id="registrationDate"
                        readOnly
                        className="form-control"
                        value={data.registreringsdatoEnhetsregisteret}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-7">
                      <label className="labels">
                        Virksomheten beskrivelse Form
                      </label>
                      <input
                        type="text"
                        id="businessCodeDescription"
                        readOnly
                        className="form-control"
                        value={data.naeringskode1.beskrivelse}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="col-md-5">
                      <label className="labels">Virksomheten kode</label>
                      <input
                        type="text"
                        id="businessCode"
                        readOnly
                        className="form-control"
                        value={data.naeringskode1.kode}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-5">
                      <label className="labels">Forettingsadresse</label>
                      <input
                        type="text"
                        id="businessStreetAddress"
                        readOnly
                        className="form-control"
                        value={data.forretningsadresse.adresse[0]}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="labels">Postnummer</label>
                      <input
                        type="text"
                        id="zipCode"
                        className="form-control"
                        readOnly
                        value={data.forretningsadresse.postnummer}
                        onChange={handleInput}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="labels">Post sted</label>
                      <input
                        type="text"
                        id="city"
                        className="form-control"
                        readOnly
                        value={data.forretningsadresse.poststed}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        // 'Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv igjen.'
        else {
          console.log(
            "Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv igjen."
          );
          return setShowData(
            <div className="row">
              <div className=" border-right">
                <h1>Noe gikk galt!</h1>
                <p>
                  Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv
                  igjen.
                </p>
              </div>
            </div>
          );
        }
      })

      // 'API Crach'
      .catch((error) => {
        setShowInfoText(true);
        return setShowData(
          <div className="row">
            <div className=" border-right">
              <h1 className="error">Noe gikk galt!</h1>
              <p className="text-center ">
                Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv
                igjen. {searchTerm}
              </p>
            </div>
          </div>
        );
      });
  };

    // ######### WORNG
    const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;
  
  
   
      setData({ ...data, [id]: value, orgNumber: searchTerm });
    };
// ------------------------------------------------
const handleEnhetregisteretNextPage = () => {
  setRegisterButton(false);

  // ## IF "organisasjonsnummer already exists in db!"
  if (enhetsRegisteretData.organisasjonsnummer === searchTerm) {
    console.log("organisasjonsnummer already exists in db!");
    setShowInfoText(true);
    setPage(page);
    return setShowData(
      <div className="row">
        <div className=" border-right">
          <h1 className="errorTitle">
            Denne organisasjonsnummer eksisterer i vårt system!
          </h1>
          <div>
            <p className="errorBody">
              Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv
              igjen. - {searchTerm}
            </p>
            <p className="errorBody">
              Ta kontakt med oss dersom du lurer på noe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // - IF "User has user registered" IF TRUE ---> PAGE 2
  if (enhetsRegisteretData.uid === userID) {
    console.log("User has user registered");
    setShowInfoText(true);
    setPage(2);
    // setTimeout(() =>{
    //   setShowData('')
    // },1000)
    return setShowData(
      <div className="row">
        <div className=" border-right">
          <h1 className="errorTitle">
            Denne brukeren har eksisterer en organisasjonsnummer tidligere:{" "}
            {enhetsRegisteretData.organisasjonsnummer}!
          </h1>
          <div>
            <p className="errorBody">
              Ta kontakt med oss dersom du lurer på noe.
            </p>
          </div>
        </div>
      </div>
    );
  }
  // ## ELSE "Data fra enhetregisteret er lageret i database!" ---> PAGE 2
  else {
    try {
      setPage(page + 1);
      // setDoc(doc(db, "enhetsRegisteret", userID), {
      //   uid: userID,
      //   ...enhetsRegisteretAPIData,
      //   createdAt: serverTimestamp(),
      // });

      console.log("Data fra enhetregisteret er lageret i database!");
    } catch (err) {
      console.log(err);
    }
  }
};

// Handle change in ORG. NUMBER Field
const handleChange = async (event) => {
  setSearchTerm(event.target.value);
};


  // ADDING THE DATA FROM COMPANY FORM. SAMVE DATA IN DB ----> company
 // Oppdatert `handleAddToDatabase`-funksjon uten `e.preventDefault()` og med korrekt plassering
 const handleAddToDatabase = async () => {
  setRegisterButton(false);

  const dataToSave = {
    uid: userID,
    ...data,
    orgNumber: searchTerm,
    aboutUs: aboutUs || "",
    industryType: industryData || [],
    country: country || "",
    phoneNumber: phoneNumber || "",
    socialMedia: socialMedia || {},
    companiesAgreements: companiesAgreements || false,
    performsTrucks: performsTrucks || false,
    images: imagesData || [],
    openingHours: days2 || {},
    status: true,
    // createdAt: serverTimestamp(), // Kommenter ut denne linjen for testing
  };

  // Fjern tomme og ugyldige felter
  const removeEmpty = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (
        obj[key] && typeof obj[key] === 'object' &&
        Object.keys(obj[key]).length === 0
      ) {
        delete obj[key];
      } else if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      } else if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
  };

  removeEmpty(dataToSave);

  // Logg dataene
  console.log("Data being written to Firestore:", dataToSave);

  try {
    await setDoc(doc(db, "company", userID), dataToSave);
    navigate("/profile");
  } catch (err) {
    console.error("Error adding document to Firestore:", err);
  }

  try {
    await setDoc(doc(db, "enhetsRegisteret", userID), {
      uid: userID,
      ...enhetsRegisteretAPIData,
      createdAt: new Date(), // Bruk en faktisk dato for testing
    });
  } catch (err) {
    console.error("Error adding enhetsRegisteret document:", err);
  }
};




  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        autoFocus={true}
        className="customModal"
      >
        {page === 1 && (
            <>
              <Modal.Header >
                <Modal.Title className="formMainLable">Data fra Enhetsregisteret</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <ProgressBar
                  now={10}
                  variant="success"
                  style={{ margin: "10px" }}
                  label={`10%`}
                />
                {/* First page of the form */}

                <form onSubmit={handleAPIRequesest}>
                  <div className="col-md-12" key="orgNumber">
                    <label className="labels">Organisasjonsnummer</label>
                    <input
                      type="number"
                      id="orgNumber"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="000000000"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-4 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary profile-button"
                        disabled={!areAllFieldsFilled}
                      >
                        Hent data
                      </button>
                    </div>
                  </div>
                </form>
                <form>
                  <div hidden={hiddenInfoText}>
                    <h4 className="text-center" style={{ margin: "30px" }}>
                      Hvorfor data fra Enhetsregisteret?
                    </h4>
                    <p className="text-center">
                      Denne informasjonen bruker vi til å verfisere
                      bedriftsinformasjon. Det er for å unngå misforståelser og
                      identitetstyveri.
                      <br />
                      Denne informasjon vil ikke være synlig for dine kunder.
                    </p>
                  </div>

                  {showData}

                  {/* <button type="submit" className="btn btn-primary profile-button">Save data</button> */}
                </form>
              </Modal.Body>

              <Modal.Footer className="modalFotterCompanyForm">
                <div className="row ">
                  <div className="col">
                    <Button variant="secondary" onClick={handleClose}>
                      Avslutt
                    </Button>
                  </div>
                  <div className="col">
                    <Button
                      style={{ height: "auto", width: "100px" }}
                      variant="primary"
                      disabled={!dataIsNotEmpty}
                      onClick={handleEnhetregisteretNextPage}
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
                  {/* <div className="col">
                    <Button variant="secondary" onClick={handlePrevPage}>
                      Tilbake
                    </Button>
                  </div> */}
                  <div className="col">
                    <Button
                      variant="primary"
                      style={{ height: "auto", width: "100px" }}
                      onClick={handleNextPage}
                    >
                      Gå videre
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          )}
        {page === 3 && (
          <>
            <Modal.Header>
              <Modal.Title className="formMainLabel">
                Registrer bedriftsinformasjon 1/4
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar
                now={progress}
                variant="success"
                style={{ margin: "10px" }}
                label={`${progress}%`}
              />
              <form>
                <div className="">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                    className="rounded companyLogo mx-auto d-block rounded-circle mt-5"
                    width="150px"
                  />

                  <div
                    className="col text-center"
                    style={{ paddingBottom: "20px" }}
                  >
                    <label htmlFor="file" style={{ paddingTop: "20px" }}>
                      Last opp firmalogo
                    </label>

                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6" key="companyName">
                      <label className="labels">Bedriftsnavn</label>
                      <input
                        type="text"
                        id="companyName"
                        {...register("companyName", { required: true })}
                        className="form-control"
                        placeholder="Bedriftsnavn ..."
                        onChange={(e) =>
                          setData({ ...data, companyName: e.target.value })
                        }
                      />
                      {errors.companyName && (
                        <p style={{ color: "red" }}>
                          Bedriftsnavn: Dette feltet er obligatorisk!
                        </p>
                      )}
                    </div>

                    <div className="col-md-6" key="CEO">
                      <label className="labels">Daglig leder</label>
                      <input
                        type="text"
                        {...register("CEO", { required: true })}
                        className="form-control"
                        id="CEO"
                        placeholder="Daglig leder ..."
                        onChange={(e) =>
                          setData({ ...data, CEO: e.target.value })
                        }
                      />
                      {errors.CEO && (
                        <p style={{ color: "red" }}>
                          Daglig leder: Dette feltet er obligatorisk!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6" key="email">
                      <label className="labels">E-post</label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              "Oppgitt verdi matcher ikke e-postformatet",
                          },
                        })}
                        className="form-control"
                        placeholder="E-post ..."
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <span style={{ color: "red" }} role="alert">
                          E-post: Dette feltet er obligatorisk!
                        </span>
                      )}
                    </div>

                    <div className="col-md-6" key="phoneNumber">
                      <label className="labels">Telefonnummer</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        {...register("phoneNumber", { required: true })}
                        className="form-control"
                        placeholder="Telefonnummer ..."
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phoneNumber && (
                        <p style={{ color: "red" }}>
                          Telefonnummer: Dette feltet er obligatorisk!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6" key="streetAddress">
                      <label className="labels">Gateadresse</label>
                      <input
                        type="text"
                        id="streetAddress"
                        {...register("streetAddress", { required: true })}
                        className="form-control"
                        placeholder="Gateadresse ..."
                        onChange={(e) =>
                          setData({ ...data, streetAddress: e.target.value })
                        }
                      />
                      {errors.streetAddress && (
                        <p style={{ color: "red" }}>
                          Gateadresse: Dette feltet er obligatorisk!
                        </p>
                      )}
                    </div>

                    <div className="col-md-3" key="zipCode">
                      <label className="labels">Postnummer</label>
                      <input
                        type="text"
                        id="zipCode"
                        {...register("zipCode", { required: true })}
                        className="form-control"
                        placeholder="Postnummer ..."
                        onChange={(e) =>
                          setData({ ...data, zipCode: e.target.value })
                        }
                      />
                      {errors.zipCode && (
                        <p style={{ color: "red" }}>
                          Postnummer: Dette feltet er obligatorisk!
                        </p>
                      )}
                    </div>

                    <div className="col-md-3" key="region">
                      <label className="labels">Sted</label>
                      <input
                        type="text"
                        id="region"
                        {...register("region", { required: true })}
                        className="form-control"
                        placeholder="Sted ..."
                        onChange={(e) =>
                          setData({ ...data, region: e.target.value })
                        }
                      />
                      {errors.region && (
                        <p style={{ color: "red" }}>
                          Sted: Dette feltet er obligatorisk!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6" key="country">
                      <label className="labels">Land</label>
                      <Select
                        placeholder="Velg land..."
                        onChange={(value) => setCountry(value.label)}
                        options={countries}
                        name="country"
                        className="country-style"
                      />
                    </div>

                    <div className="col-md-6" key="industryType">
                      <label className="labels">Bransje</label>
                      <Select
                        placeholder="Velg bransje..."
                        isMulti
                        required
                        onChange={(value) =>
                          setIndustryData(value.map((c) => c.value))
                        }
                        options={options}
                        name="industryType"
                      />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="performsTrucks"
                        checked={performsTrucks}
                        onChange={() => setPerformsTrucks(!performsTrucks)}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="form-check-label"
                        htmlFor="performsTrucks"
                      >
                        Utfører arbeid for lastebiler?
                      </label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="companiesAgreements"
                        checked={companiesAgreements}
                        onChange={() =>
                          setCompaniesAgreements(!companiesAgreements)
                        }
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="form-check-label"
                        htmlFor="companiesAgreements"
                      >
                        Leverer du faste avtaler for bedrifter?
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className="modalFooterCompanyForm">
              <div className="row ">
                <div className="col">
                  <Button variant="secondary" onClick={handleClose}>
                    Avslutt
                  </Button>
                </div>
                <div className="col">
                  <Button
                    variant="primary"
                    style={{ height: "auto", width: "100px" }}
                    onClick={handleNextPage}
                  >
                    Neste
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        )}
        {page === 4 && (
          <>
            <Modal.Header>
              <Modal.Title className="formMainLabel">
                Registrer bedriftsinformasjon 2/4
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar
                now={progress}
                variant="success"
                style={{ margin: "10px" }}
                label={`${progress}%`}
              />
              <form>
                <h6 className="formTitle">Sosiale medier</h6>
                <div className="row mt-2">
                  <div className="col-md-6" key="website">
                    <label className="labels">Nettside</label>
                    <input
                      type="text"
                      id="website"
                      placeholder="www.nettside.no"
                      className="form-control fromControlCompanyForm"
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          website: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6" key="instagram">
                    <label className="labels">Instagram</label>
                    <input
                      type="text"
                      id="instagram"
                      placeholder="www.instagram.com"
                      className="form-control fromControlCompanyForm"
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          instagram: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6" key="facebook">
                    <label className="labels">Facebook</label>
                    <input
                      type="text"
                      id="facebook"
                      placeholder="www.facebook.com"
                      className="form-control fromControlCompanyForm"
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          facebook: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6" key="youtube">
                    <label className="labels">YouTube</label>
                    <input
                      type="text"
                      id="youtube"
                      placeholder="www.youtube.com"
                      className="form-control fromControlCompanyForm"
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          youtube: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className="modalFooterCompanyForm">
              <div className="row ">
                <div className="col">
                  <Button variant="secondary" onClick={handlePrevPage}>
                    Tilbake
                  </Button>
                </div>
                <div className="col">
                  <Button
                    variant="primary"
                    style={{ height: "auto", width: "100px" }}
                    onClick={handleNextPage}
                  >
                    Neste
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        )}
        {page === 5 && (
          <>
            <Modal.Header>
              <Modal.Title className="formMainLabel">
                Registrer bedriftsinformasjon 3/4
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar
                now={progress}
                variant="success"
                style={{ margin: "10px" }}
                label={`${progress}%`}
              />
              <form>
                <h6 className="formTitle">Om oss</h6>
                <div className="row mt-3">
                  <div className="col-md" key="about">
                    <label className="labels">Om oss</label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ height: "200px" }}
                      placeholder="Om oss ...."
                      id="about"
                      onChange={(e) => setAboutUs(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer className="modalFooterCompanyForm">
              <div className="row ">
                <div className="col">
                  <Button variant="secondary" onClick={handlePrevPage}>
                    Tilbake
                  </Button>
                </div>
                <div className="col">
                  <Button
                    variant="primary"
                    style={{ height: "auto", width: "100px" }}
                    onClick={handleNextPage}
                  >
                    Neste
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        )}
        {page === 6 && (
          <>
            <Modal.Header>
              <Modal.Title className="formMainLabel">
                Registrer bedriftsinformasjon 4/4
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProgressBar
                now={progress}
                variant="success"
                style={{ margin: "10px" }}
                label={`${progress}%`}
              />
              <h6 className="formTitle">Bekreft informasjon</h6>
              {/* Her kan du legge til en oversikt over all informasjon brukeren har fylt inn */}
              <p>Vennligst bekreft at informasjonen er korrekt før du lagrer.</p>
            </Modal.Body>
            <Modal.Footer className="modalFooterCompanyForm">
              <div className="row ">
                <div className="col">
                  <Button variant="secondary" onClick={handlePrevPage}>
                    Tilbake
                  </Button>
                </div>
                <div className="col">
                <Button onClick={handleAddToDatabase} variant="success">
                        Lager
                      </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

export default RegistrationForm;
