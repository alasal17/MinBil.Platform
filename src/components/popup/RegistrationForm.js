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
import firebase from "firebase/compat/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { RMIUploader } from "react-multiple-image-uploader";
import ProgressBar from "react-bootstrap/ProgressBar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import "./registrationForm.css";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MuiPhoneInput from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import setBodyColor from './setBodyColor'
import { urlParams } from "via/lib/utils";
import { style } from "@mui/system";
import BackgroundImage2 from './form_background2.png'
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import { idText } from "typescript";
import Confetti from "react-confetti";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SuccessMessages from "./SuccessMessages";
import { set } from "date-fns";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

import { signInWithEmailAndPassword, getAuth, provider } from "firebase/auth";



function RegistrationForm({ buttonName, ref_reg }) {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [registerButton, setRegisterButton] = useState(false);
  // const [inputList, setInputList] = useState({
  //   openingDays: "",
  //   openingTime: "",
  //   closingTime: "",
  // });

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
  const [companiesAgreements, setCompaniesAgreements] = useState(true);
  const [performsTrucks, setPerformsTrucks] = useState(false);
  const [aboutUs, setAboutUs] = useState([]);
  const regx = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  const userID = currentUser.uid;
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
  if(days.length < 7){
    setDays([...days, {day: "", open: "", close: ""}]);

    setAddFieldIcon(false)
  } else if(days.length === 7){
    setAddFieldIcon(true)
  } else{
    setAddFieldIcon(false)
  }

  

  console.log(days)

}

const handleRemoveClick = index => {
  const list = [...days];
  list.splice(index, 1);
  setDays(list);
};

  // ----------- FOR UPLOAD IMAGES -------------
  const onUpload = async (data) => {
    // console.log("Upload files", data.map((item) => item.dataURL));
    let list = [];
    let list2 = [];

    // console.log(data)

    data.map((e) => {
      if (e.img) {
        if (list.includes(e.img.id)) {
          console.log("Not temp images In list");
          console.log("id", list.includes(e.file.name));
        } else {
          console.log("Not temp images");
          list.push(e.img.id);
        }
      }
      if (e.file) {
        if (!list.includes(e.file.name)) {
          console.log("Temp images");
          console.log("file", list.includes(e.file.name));
          list.push(e.file.name);
          // list2.push(e.dataURL)
          setImagesData([...imagesData, e.dataURL]);
        } else {
          list.push(e.file.name);
          console.log("Temp images is in list");
          console.log("Temp images is in list", imagesData);
          setImagesData([...imagesData, e.dataURL]);
        }
      } else {
        // console.log('someting else')
        // console.log(e.file)
        // console.log(list)
      }
    });

    //
    // setImagesData([data.map(e => e.dataURL)])

    // await setImagesData(...imagesData, [data.map((e) => e.index)]);
    console.log("OWN DATA", imagesData);
    // console.log("Image Data", imagesData);
  };



  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ------------- FOR CALLING enhetsRegisteret DB -----------------
  useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      collection(db, "enhetsRegisteret"),
      (snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          //   if(doc.id === userID){
          //     list.push({id: doc.id, ...doc.data()});
          // }

          if (doc.id === userID) {
         
            setSearchTerm(doc.data().orgNumber);
          } else {
          }
        });

        setEnhetsRegisteretData(list);
      },

      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // ------------- FOR UPLOADING COMPANY LOGO -----------------
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
            setData((prev) => ({ ...prev, companyLogo: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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

  const handleCompaniesAgreementsChange = () => {
    setCompaniesAgreements(!companiesAgreements);
  };

  const handlePerformsTrucksChange = () => {
    setPerformsTrucks(!performsTrucks);
  };


  // ------------- HADNLE FOR NEXT PAGE : WRONG ---> setSocialMedia -----------------
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // ------------- HADNLE FOR PREV PAGE ----------------
  const handlePrevPage = () => setPage(page - 1);


 
  const startOver = () => {
    setPage(1);
  };


  const handleAboutUsInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setAboutUs({ about: value });
  };

  const handleNextPageAboutUs = () => {
    if (aboutUs.about === undefined || aboutUs.about === "") {
      setRecommendedAboutUs(false);
      setRecommendedColor('red')
      setPage(page + 1);
    } else {
      setRecommendedAboutUs(true);
      setRecommendedColor('black')
      setPage(page + 1);
    }
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

  // Handle change in ORG. NUMBER Field
  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectedChange = (e) => {
    setSelectedOption({
      multiValue: [...e.target.selectedOptions].map((o) => o.value),
    });
  };

  // ADDING THE DATA FROM COMPANY FORM. SAMVE DATA IN DB ----> company
  const handleAddToDatabase = async (e) => {
    e.preventDefault();
    setRegisterButton(false);
    try {
      await setDoc(doc(db, "company", userID), {
        uid: userID,
        ...data,
        orgNumber: searchTerm,
        // ...openingsData,
        ...aboutUs || '',
        ...industryData,
        ...country,
        ...phoneNumber,
        ...socialMedia,
        ...companiesAgreements,
        ...performsTrucks,
        numberOfEmployees:null,
        linkedin:'',
        images:[...imagesData] || [],
        openingHours: {...days2},
        companiesAgreements:companiesAgreements || false,
        performsTrucks:performsTrucks || false,
        status:true ,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    try {
      await setDoc(doc(db, "enhetsRegisteret", userID), {
        uid: userID,
        ...enhetsRegisteretAPIData,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }

    setPage(page + 1 )
    setTimeout(() =>{
      navigate('/')
    }, 6000)

    
  };

  // ADDING DATA TO setSocialMedia
  const handleSocialInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setSocialMedia({ ...socialMedia, [id]: value ?? "" });

    if (socialMedia.id === undefined || socialMedia.value === "") {
      setRecommendedSocialMedia(true);
    } else {
      setRecommendedSocialMedia(false);
    }
  };

  const handleOpeningDataInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const name = e.target.name;

    // if(name === 'mondayOpen' || name === 'mondayClose'){
    //   setOpeningsData( { openingHours:{Monday:{ [id]: value},}, ...openingsData});
    // }
    

  };
  // ######### WORNG
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;


 
    setData({ ...data, [id]: value, orgNumber: searchTerm });
  };


  const handleInputOpeningsNextPage = e => {
   
    // setOpeningsData({...openingsData, [e.target.name]: e.target.value})
   
      };


  const popPageThreeInfo = (
    <Popover id="popover-basic">
      <Popover.Header className="formInfoIcon" as="h3">Popover right</Popover.Header>
      <Popover.Body>
      Vi <strong>anbefaler</strong>  at du fyller inn informasjon om oss. Denne informasjon vil være synlig for dine kunder. 
      </Popover.Body>
<br/>
      <Popover.Header className="formInfoIcon" as="h3">Popover right</Popover.Header>
      <Popover.Body>
      Vi <strong>anbefaler</strong>  at du fyller inn informasjon om oss. Denne informasjon vil være synlig for dine kunder. 
      </Popover.Body>
    </Popover>
  );

  // const openingHoursErrorMessage = (
   
  // );
  

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
      <Button variant="primary" ref={ref_reg} name='registration_form' onClick={handleShow}>
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
              <Modal.Header >
                <Modal.Title className="formMainLable">Register bedriftsinformasjon 1/3</Modal.Title>
              </Modal.Header>
              <form onSubmit={handleSubmit(handleNextPage)}>
                <Modal.Body>
                  <ProgressBar
                    now={40}
                    variant="success"
                    style={{ margin: "10px" }}
                    label={`40%`}
                  />
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

                    {/* <span className="font-weight-bold">Bedriftslogo</span><span> </span> */}
                    <div
                      className="col text-center"
                      style={{ paddingBottom: "20px" }}
                    >
                      <label htmlFor="file" style={{ paddingTop: "20px" }}>
                       <CloudUploadOutlinedIcon className="icon upload-image" />
                      </label>

                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-6" >
                        <label className="labels">Org. nummer</label>
                        <input
                          type="text"
                          id="orgNumber"
                          style={{ backgroundColor: "#dde2eb" }}
                          readOnly
                          className="form-control"
                          value={searchTerm}
                          onChange={handleInput}
                        />
                      </div>

                      <div className="col-md-6" key="CEO">
                        <label className="labels">Dagligleder</label>
                        <input
                          type="text"
                          {...register("CEO", { required: true })}
                          className="form-control"
                          id="CEO"
                          onChange={handleInput}
                        />
                        {errors.CEO && (
                          <p style={{ color: "red" }}>
                            Dagligleder: Dette feltet er obligatorisk!
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6" key="companyName">
                        <label className="labels">Bedriftsnavn</label>
                        <input
                          type="text"
                          id="companyName"
                          {...register("companyName", { required: true })}
                          className="form-control"
                          placeholder="bedriftsnavn ..."
                          onChange={handleInput}
                        />
                        {errors.companyName && (
                          <p style={{ color: "red" }}>
                            Bedriftsnavn: Dette feltet er obligatorisk!
                          </p>
                        )}
                      </div>

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
                                "Entered value does not match email format",
                            },
                          })}
                          className="form-control"
                          placeholder="epost ..."
                          onChange={handleInput}
                        />
                        {errors.email && (
                          <span style={{ color: "red" }} role="alert">
                            E-post: Dette feltet er obligatorisk!
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6" key="phoneNumber">
                        <label className="labels">Telefon nummer</label>
                        <MuiPhoneInput
                          name="phoneNumber"
                          // onChange={handleInput}
                          onChange={(value) =>
                            setPhoneNumber({ phoneNumber: value })
                          }
                          className="form-control"
                          defaultCountry="no"
                          onlyCountries={["no", "se", "dk", "is", "fi"]}
                        />
                        {errors.phoneNumber && (
                          <p style={{ color: "red" }}>
                            Telefon nummber: Dette feltet er obligatorisk!
                          </p>
                        )}
                        {/* <input  id ="phoneNumber" type="tel" placeholder="Telefon nummer" {...register("phone",  {required: true, pattern:[/^[0-9+-]+$/, /[^a-zA-Z]/], minLength: 8, maxLength: 12})}    onChange={handleInput}/>
                {errors?.phone && errors.phone.message} */}
                      </div>

                      <div className="col-md-6" key={countries.value}>
                        <label className="labels">Land</label>

                        <Select
                          placeholder="Velg land..."
                          defaultValue={countries.value}
                          onChange={(value) =>
                            setCountry({ country: value.label })
                          }
                          options={countries}
                          name="country"
                          className="country-style"
                        />
                        {errors.country && (
                          <span style={{ color: "red" }} role="alert">
                            Land: Dette feltet er obligatorisk!
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6" key="streetAddress">
                        <label className="labels">Gate adresse</label>
                        <input
                          type="text"
                          id="streetAddress"
                          {...register("streetAddress", {
                            required: "required",
                          })}
                          className="form-control"
                          placeholder="Oslo Gate 33"
                          onChange={handleInput}
                        />
                        {errors.companyName && (
                          <p style={{ color: "red" }}>
                            Gate adresse: Dette feltet er obligatorisk!
                          </p>
                        )}
                      </div>

                      <div className="col-md-3" key="city">
                        <label className="labels">Sted</label>
                        <input
                          type="text"
                          id="region"
                          {...register("region", {
                            required: "required",
                          })}
                          className="form-control"
                          placeholder="Oslo"
                          onChange={handleInput}
                        />
                        {errors.companyName && (
                          <p style={{ color: "red" }}>
                            Sted: Dette feltet er obligatorisk!
                          </p>
                        )}
                      </div>

                      <div className="col-md-3" key="zipCode">
                        <label className="labels">Postnummer</label>
                        <input
                          type="text"
                          id="zipCode"
                          className="form-control"
                          placeholder="1069"
                          {...register("zipCode", {
                            required: "required",
                          })}
                          onChange={handleInput}
                        />
                        {errors.companyName && (
                          <p style={{ color: "red" }}>
                            Postnummer: Dette feltet er obligatorisk!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-12" key="industryType">
                        <label className="labels">
                          Bransje (må velge minst ett bransje){" "}
                        </label>

                        <Select
                          {...register("industryType", {})}
                          id="industryType"
                          placeholder="Legg til bransje"
                          isMulti
                          required
                          onChange={(value) =>
                            setIndustryData({
                              industryType: value.map((c) => c.value),
                            })
                          }
                          options={options}
                          name="industryType"
                        />
                        {errors.companyName && (
                          <p style={{ color: "red" }}>
                            Bransje: Dette feltet er obligatorisk!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="" style={{ margin: "10px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input "
                        id="performsTrucks"
                        checked={performsTrucks}
                        onChange={handlePerformsTrucksChange}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className="col-md-3 form-check-label"
                        key="performsTrucks"
                        htmlFor="exampleCheck1"
                      >
                        Utfører arbeid for lastebiler?
                      </label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="companiesAgreements"
                        checked={companiesAgreements}
                        onChange={handleCompaniesAgreementsChange}
                      />
                      <label
                        style={{ paddingLeft: "10px" }}
                        className=" col-md-4 form-check-label"
                        key="companiesAgreements"
                        htmlFor="exampleCheck1"
                      >
                        Leverer du faste avtaler for bedrifter?
                      </label>
                    </div>

                    {/*<button type="submit"  className="btn btn-primary profile-button">Save data</button> */}
                  </div>
                </Modal.Body>
                <Modal.Footer className="modalFotterCompanyForm">
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary">Tilbake</Button>
                    </div>
                    <div className="col">
                      <Button
                        variant="primary"
                        style={{ height: "auto", width: "100px" }}
                        disabled={firstFormValidated}
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
          {page === 4 && (
            <>
            <form onSubmit={handleSubmit(handleNextPagefem)}>
              <Modal.Header >
                <Modal.Title className="formMainLable data">Register bedriftsinformasjon 2/3
                <span >
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
              <Modal.Body>
                <ProgressBar
                  now={60}
                  variant="success"
                  animated 
                  bsPrefix={''}
                  style={{ margin: "10px",  fillColor:'#7451f8'}}
                  label={`60%`}
                  filledbackground="linear-gradient(to right, #fefb72, #f0bb31)"
                />
                <h6 className="formTitle">Sosiale medier</h6>
                <div className="row mt-2">
                <div className="col-md-2" ></div>

                <div className="col-md-4" key="instagram">
                 
                    <GoogleLoginButton className="icons" align='right' iconSize='40px' iconFormat={'fa-icon fa-icon-google'}  text= "Logg inn Google " onClick={() => alert("Google")} />
                  </div>

                  <div className="col" >
                  
                    <FacebookLoginButton className="icons" align='right' iconSize='40px' iconFormat={'fa-icon fa-icon-facebook'}  text= "Logg inn Facebook "  onClick={handleFacebookLogin}/>
                  
                  </div>

                  <div className="col-md-1" ></div>
                  
                </div>
                <div className="row mt-2">
                  <div className="col-md-3" key="website">
                    <label className="labels customLabel">Nettside</label>
                    <input
                      type="text"
                      id="website"
                      placeholder="www.nettside.no"
                      className="form-control fromControlCompanyForm"
                      onChange={handleSocialInput}
                    />
                  </div>

                 

                  <div className="col-md-3" key="youtube">
                    <label className="labels">Youtube</label>
                    <input
                      type="text"
                      id="youtube"
                      className="form-control fromControlCompanyForm"
                      placeholder="www.youtube.com"
                      onChange={handleSocialInput}
                    />
                  </div>
                </div>

<br/>
<br/>
<hr className="divLine"/>


                <h6 className="formTitle">Åpningstider</h6>

              
                <div hidden={openingHoursError} className="bord">
                  <h4 className="errorTitle">Anbefaling!</h4>
                  <p className="recommendedBody">
                    {" "}
                    Feltene for alle dagene må være fylt inn. Mandag-Søndag. 
                  </p>
                </div>

     
<br/>
<br/>
                
                  
              
{days.map((field, index) => (
  <div className="row mt-2 " key={index}>

<div className="col-md-1">

</div>

          <div className="col-md-3" key="day">
          <label className="labels customLabel text-center">Dag</label>
          <select name="day" className="form-control text-center fromControlCompanyForm" value={field.day || ''} onChange={e => handleChangeBusnissHours(e, index)}>
            <option value="">Velg dag...</option>
            {weekDays.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          </div>

          <div className="col-md-3" key="open">
          <label className="labels customLabel text-center">Åpningstid</label>
          <select  name="open" className="form-control text-center fromControlCompanyForm" value={field.open || ''} onChange={e => handleChangeBusnissHours(e, index)}>
            <option value="">Velg tid...</option>
            {hours_list.map(open => <option key={open} value={open}>{open}</option>)}
          </select>
          </div>

          <div className="col-md-3" key="close">
          <label className="labels customLabel text-center">Åpningstid</label>
          <select name="close" className="form-control text-center fromControlCompanyForm" value={field.close || ''} onChange={e => handleChangeBusnissHours(e, index)}>
            <option value="">Velg tid...</option>
            {hours_list.map(close => <option key={close} value={close}>{close}</option>)}
          </select>
          </div>

          {/* <div className="col-md-3" key="open">
          <label className="labels customLabel text-center">Åpningstid</label>
          <input type="text" className="form-control text-center fromControlCompanyForm"  name="open" value={field.open || ''} onChange={e => handleChangeBusnissHours(e, index) } />
          </div> 

          <div className="col-md-3" key='close'>
          <label className="labels customLabel text-center ">Stengetid</label>
          <input type="text"  pattern="[0-9]+:[0-9]$" className="form-control text-center fromControlCompanyForm"  name="close" value={field.close || ''} onChange={e => handleChangeBusnissHours(e, index)} />
   
        </div>
*/}
        <div className="col-md-1">
          {days.length !== 1 && 
        <DeleteIcon onClick={handleRemoveClick} style={{color:'#ae0000'}} className=' mx-auto  mt-4'/>
          }   {days.length - 1 === index && <AddBoxIcon className=' mx-auto  mt-4' style={{color:'#0068C3'}} onClick={handleAddDay} hidden={addFieldIcon}/>}
          
        </div>
        </div>

      ))}
  
              </Modal.Body>
              <br/>
              <br/>
              <Modal.Footer className="modalFotterCompanyForm" style={{paddingTop:'20px'}}>
                <div className="row">



                  <div className="col">
                    <Button variant="secondary" onClick={handlePrevPage}>
                      Tilbake
                    </Button>
                  </div>


                  <div className="col" >
                    <Button
                      variant="primary"
                      style={{ height: "auto", width: "100px" }}
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
          {page === 5 && (
             
            
            <>
            
              <Modal.Header >
                <Modal.Title className="formMainLable">Register bedriftsinformasjon 3/3 
                
                <span >
                <OverlayTrigger
                    key={'right'}
                    placement={'right'}
                    overlay={popPageThreeInfo}
            >  
                  <ErrorOutlineTwoToneIcon className="formMainLableInfo" style={{left: '95%',  position: 'absolute'}}/>
                  </OverlayTrigger>
                </span>
                
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProgressBar
                  now={80}
                  variant="success"
                  animated
                  style={{ margin: "10px" }}
                  label={`100%`}
                />

                <div className="row mt-3">
                  <div className="col-md" key="about">
                    
                    <label className="labels">Om oss 
                    </label>
                    
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ height: "200px" }}
                      placeholder="Om oss ...."
                      id="about"
                      onChange={handleAboutUsInput}
                    />
                  </div>
                </div>

                <RMIUploader
                  id
                  isOpen={visible}
                  hideModal={hideModal}
                  onSelect={handleImagesInput}
                  onUpload={handleImagesInput}
                  onRemove={onRemove}
                  dataSources={dataSources}
                  onChange={handleImagesInput}
                />
              </Modal.Body>
              <div className="row mt-2">
              <Modal.Footer className="modalFotterCompanyForm">
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary" onClick={handlePrevPage}>
                        Tilbake
                      </Button>
                    </div>
                    <div className="col">
                      <Button
                        onClick={handleNextPageAboutUs}
                        variant="primary"
                        style={{ height: "auto", width: "100px" }}
                      >
                        Gå videre
                      </Button>
                    </div>
                  </div>
                </Modal.Footer>
              </div>
            </>
          )}
          {page === 6 && (
            <>
              <Modal.Header >
                <Modal.Title className="formMainLable">Register bedriftsinformasjon 3/3</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProgressBar
                  now={100}
                  variant="success"
                  style={{ margin: "10px" }}
                  label={`100%`}
                />

                <div className="row mt-2">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <img
                      src={
                        file
                          ? data.companyLogo
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                      className="rounded companyLogoSummery mx-auto d-block rounded-circle mt-5"
                      width="200px"
                    />
                  </div>

                  <div className="col-md-3"></div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-4">
                    <label className="labels">Organisasjonsnummer</label>
                    <input
                      type="text"
                      id="orgNumber"
                      className="form-control"
                      readOnly
                      value={data.orgNumber}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="labels">Bedriftsnavn</label>
                    <input
                      type="text"
                      id="companyName"
                      className="form-control"
                      readOnly
                      value={data.companyName}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="labels">Dagligleder</label>
                    <input
                      type="text"
                      id="CEO"
                      className="form-control"
                      readOnly
                      value={data.CEO}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-3">
                    <label className="labels">Adresse</label>
                    <input
                      type="text"
                      id="streetAddress"
                      className="form-control"
                      readOnly
                      value={data.streetAddress}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="labels">Sted</label>
                    <input
                      type="text"
                      id="region"
                      className="form-control"
                      readOnly
                      value={data.region}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="labels">Postnummer</label>
                    <input
                      type="text"
                      id="zipCode"
                      className="form-control"
                      readOnly
                      value={data.zipCode}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="labels">Land</label>
                    <input
                      type="text"
                      id="country"
                      className="form-control"
                      readOnly
                      value={country.country}
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-3">
                    <label className="labels">E-post</label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      readOnly
                      value={data.email}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="labels">Telefon nummer</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-control"
                      readOnly
                      value={phoneNumber.phoneNumber}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Bransje</label>
                    <input
                      type="text"
                      id="industry"
                      className="form-control"
                      readOnly
                      placeholder="IKKE LAGT TIL"
                      // value={industryData.industry.map((e) => e) ?? ''}
                    />
                  </div>
                </div>

                <div className="row mt-2" style={{ paddingTop: "20px" }}>
                  <div className="col-md-1"></div>

                  <div className="col-md-5">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="companiesAgreements"
                      readOnly
                      checked={companiesAgreements}
                      value={companiesAgreements}
                    />
                    <label key="performsTrucks" htmlFor="exampleCheck1">
                      Utfører arbeid for lastebiler?
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="performsTrucks"
                      readOnly
                      checked={performsTrucks}
                      value={performsTrucks}
                    />
                    <label key="companiesAgreements" htmlFor="exampleCheck1">
                      Leverer du faste avtaler for bedrifter?
                    </label>
                  </div>
                  <div className="" style={{ margin: "10px" }}>
                    <div className="col-md-1"></div>
                  </div>

                  {/* 
                      <div className="col-md-3" >
                      <label className="labels">performsTrucks</label>
                         <input
                        type="checkbox"
                        className="form-check-input"
                        id="performsTrucks"
                        readOnly
                        checked={performsTrucks}
                        value={performsTrucks}
                       
                      />

                 
                      </div> */}
                </div>

                <br />
                <br />
                <hr className="divLine" />
                <br />
                <br />
                <h6 className="formTitle">Sosiale medier</h6>
                <div hidden={recommendedSocialMedia} className="bord">
                  <h4 className="recommendedTitle">Anbefaling!</h4>
                  <p className="recommendedBody">
                    {" "}
                    Vi anbefaler at du fyller inn dataen for dine sosiale medier
                    og nettside. <br /> Det vil øker intressen hos dine kunder.
                  </p>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <label className="labels">Nettside</label>
                    <input
                      type="text"
                      id="website"
                      className="form-control"
                      style={{color:recommendedColor}}
                      readOnly
                      placeholder="IKKE LAGT TIL"
                      value={socialMedia.website || "IKKE LAGT TIL"}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="labels">Instagram</label>
                    <input
                      type="text"
                      id="instagram"
                      className="form-control"
                      style={{color:recommendedColor}}
                      readOnly
                      placeholder="IKKE LAGT TIL"
                      value={socialMedia.instagram || "IKKE LAGT TIL"}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="labels">Facebook</label>
                    <input
                      type="text"
                      id="facebook"
                      className="form-control"
                      style={{color:recommendedColor}}
                      readOnly
                      value={socialMedia.facebook || "IKKE LAGT TIL"}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="labels">Youtube</label>
                    <input
                      type="text"
                      id="youtube"
                      className="form-control"
                      style={{color:recommendedColor}}
                      readOnly
                      placeholder="IKKE LAGT TIL"
                      value={socialMedia.youtube || "IKKE LAGT TIL"}
                    />
                  </div>
                </div>
                <div hidden={recommendedOpeningDays} className="bord">
                  <h4
                    className="recommendedTitle"
                    style={{ paddingTop: "30px" }}
                  >
                    Anbefaling!
                  </h4>
                  <p className="recommendedBody">
           
                    Vi anbefaler at du fyller inn dataen for åpningstid og
                    stengetid. <br /> Det vil øker intressen hos dine kunder.
                  </p>
                </div>
                
           
                <br />
                
                <br />
                <h6 className="formTitle">Åpningstider</h6>
                       
                  <div className="row mt-2">

                   {days.map(e => (
                      <div className="col-md-3">
                      <label className="labels">{e.day}</label>
                      <input
                        type="text"
                        id="Mandag"
                        className="form-control"
                        readOnly
                        placeholder="IKKE LAGT TIL"
                        value={e.open + '-' + e.close || "IKKE LAGT TIL"}

                      />
                    </div>
                    ))}

                   

                   
                    
                  </div>


                <br />
                <hr className="divLine" />
                <br />
                <br />
                <div hidden={recommendedAboutUs} className="bord">
                  <h4 className="recommendedTitle">Anbefaling!</h4>
                  <p className="recommendedBody">
                    {" "}
                    Vi anbefaler at du fyller inn informasjon om oss. Denne
                    informasjon vil være synlig for dine kunder. <br /> Det vil
                    øker intressen hos dine kunder.
                  </p>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <h5 className="labels text-center">Om oss</h5>
                    <div hidden={!recommendedAboutUs} className="aboutUsBord">
                      <p className="aboutUsBordBody">{aboutUs.about}</p>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <hr className="divLine" />
                <br />
                <br />
                <div className="row mt-2"></div>
                <br />
                <h3 className="text-center">Bilder</h3>
                <div className="col">
                  {imagesData.map((imgSrc, index) => (
                    <img
                      src={imgSrc}
                      key={index}
                      alt=""
                      className="sumCompanyLogoSummery"
                      height={"100px"}
                      width={"100px"}
                    />
                  ))}
                </div>
              </Modal.Body>
              <div className="row mt-2">
                <Modal.Footer>
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary" onClick={handlePrevPage}>
                        Tilbake
                      </Button>
                    </div>
                    <div
                      className="col"
                      style={{ marginLeft: "50px", marginRight: "50px" }}
                    >
                      <Button
                        onClick={startOver}
                        variant="primary"
                        style={{ height: "auto", width: "130px" }}
                      >
                        Start på nytt
                      </Button>
                    </div>
                    <div className="col">
                      <Button onClick={handleAddToDatabase} variant="success">
                        Lager
                      </Button>
                    </div>
                  </div>
                </Modal.Footer>
              </div>
            </>
          )}
           {page === 7 && (

      
            <>
              

              <div>
             <SuccessMessages/>
</div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}
export default RegistrationForm;
