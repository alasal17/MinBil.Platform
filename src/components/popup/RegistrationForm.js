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
import "./registrationForm.css";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MuiPhoneInput from "material-ui-phone-number";
import { json, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function RegistrationForm({ buttonName }) {
  const [date, setDate] = React.useState(dayjs("2022-04-07T10:15"));
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [registerButton, setRegisterButton] = useState(false);
  const [inputList, setInputList] = useState([
    { openingDays: "", openingHours: "" },
  ]);
  const [enhetsRegisteretAPIData, setEnhetsRegisteretAPIData] = useState([]);
  const [enhetsRegisteretDB, setEnhetsRegisteretDB] = useState([]);
  const [data2, setData2] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const postsCollectionRef = collection(db, "enhetsRegisteret");
  const [per, setPerc] = useState(null);
  const [hiddenInfoText, setShowInfoText] = useState(false);
  const [firstFormValidated, setFirstFormValidated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showData, setShowData] = useState();
  const [file, setFile] = useState("");
  
  const [industryData, setIndustryData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [country, setCountry] = useState([]);
  const [hiddeAddIcon, setHiddeAddIcon] = useState(false);
  const [openingsData, setOpeningsData] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [tempImagesData, setTempImagesData] = useState([]);
  const [socialMedia, setSocialMedia] = useState({});
  const [companiesAgreements, setCompaniesAgreements] = useState(false);
  const [performsTrucks, setPerformsTrucks] = useState(false);
  const [aboutUs, setAboutUs] = useState(false);
  const [enhetsRegisteretAPIDataSaved, setEnhetsRegisteretAPIDataSaved] = useState([]);
  const  [requestFailed, setRequestFailed] = useState(true);
  const userID = auth.currentUser.uid;
  const areAllFieldsFilled = (!(searchTerm === "") & !(searchTerm === undefined));
  const dataIsNotEmpty = (enhetsRegisteretAPIData.length !== 0) & (areAllFieldsFilled !== true) & (enhetsRegisteretAPIData.status !== 400);
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

          setImagesData([...imagesData, e.dataURL]);
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
  // const onSelect = async (data) => {
  //   await setImagesData(...imagesData, data);
  //   console.log(imagesData)
  // };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            setPage(2);
            setSearchTerm(doc.data().organisasjonsnummer);
          } else {
          }
        });

        setEnhetsRegisteretDB(list);
      },

      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
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
            setData((prev) => ({ ...prev, companyLogo: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  // useEffect(() => {

  //   const uploadFile = () => {
  //     const name = new Date().getTime() + file.name;

  //     console.log(name);
  //     const storageRef = ref(storage, file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         setPerc(progress);
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setData2((prev) => ({ ...prev, companyLogo: downloadURL }));
  //         });
  //       }
  //     );
  //   };
  //   file && uploadFile();
  // }, [file]);

  const handleEnhetregisteretNextPage = () => {
    setRegisterButton(false);


      console.log(enhetsRegisteretAPIData.uid);
      
      if (enhetsRegisteretDB.organisasjonsnummer === searchTerm) {
        console.log("organisasjonsnummer already exists in db!");
        setShowInfoText(true);
        setPage(page);
        
        
        // setTimeout(() =>{
        //   setShowData('')
        // },1000)
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

      if (enhetsRegisteretDB.uid === userID) {
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
                {enhetsRegisteretDB.organisasjonsnummer}!
              </h1>
              <div>
                <p className="errorBody">
                  Ta kontakt med oss dersom du lurer på noe.
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        try {

          
          
          setDoc(doc(db, "enhetsRegisteret", userID), {
            uid: userID,
            ...enhetsRegisteretAPIData,
            createdAt: serverTimestamp(),
          });
          console.log("Data fra enhetregisteret er lageret i database!");
          setEnhetsRegisteretAPIDataSaved(
            <div>
              
              <div className="row">
                <div className=" border-right">
                  <div className="alert alert-success" role="alert">
                    <span className="text-center">
                      <h1>Velkommen!</h1>
                      <p>{}</p>
                      <p style={{fontWeight:' 800'}}>
                      Nå er ditt organisasjonsnummer {searchTerm} registeret i vårt system.
                      </p>
                    </span>
                  </div>
                </div>
            </div>
          </div>

            )
          return(
            
            setTimeout(() => {
              setPage(page + 1)}, 5000)
          )
          
        } catch (err) {
          console.log(err);
        }
      }
   
  };
  const handleNextPage =() => {
    setPage(page + 1);
  }

  const handlePageFourNextPage = () => {
    if (socialMedia.youtube === undefined) {
      setSocialMedia({ ...socialMedia, youtube: null });
    } else {
      console.log("");
    }

    if (socialMedia.facebook === undefined) {
      setSocialMedia({ ...socialMedia, facebook: null });
    } else {
      console.log("");
    }

    if (socialMedia.instagram === undefined) {
      setSocialMedia({ ...socialMedia, instagram: null });
    } else {
      console.log("");
    }

    if (socialMedia.website === undefined) {
      setSocialMedia({ ...socialMedia, website: null });
    } else {
      console.log("");
    }

    setPage(page + 1);
  };
  const handlePrevPage = () => setPage(page - 1);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    list[index]["openingDays"] = weekDays[index];
    setInputList([...inputList, { openingDays: "", openingHours: "" }]);
    // setInputList({'OpningDays':weekDays[index], 'OpningHours':e.target.value });

    console.log(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    if (inputList.length <= 6) {
      setInputList([...inputList, { openingDays: "", openingHours: "" }]);
    } else {
      setHiddeAddIcon(true);
      console.log("All seven days");
    }
  };

  // Search in API
  const handleAPIRequesest = async (event) => {
    event.preventDefault();
    // console.log('Enhetsregisteret API call, SearchTerm: ', {searchTerm})
    fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setEnhetsRegisteretAPIData(data);
        
        if (data.status !== 400 ) {
          console.log('<---- data.organisasjonsnummer !== "" || data.organisasjonsnummer !== undefined ----> ')
         
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
                        onChange={handleInput}
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
                        value={data.forretningsadresse.adresse.map((e) => e)}
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
        if(searchTerm.length > 9 || searchTerm.length < 9)
        {
          console.log(`Organisasjonsnummer skal inneholde 9-siffer. Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv igjen.`)

          return setShowData(
            <div className="row">
              <div className=" border-right">
              <div className="alert alert-danger" role="alert">
              <span className="text-center">
                <h1>Noe gikk galt!</h1><p>Status kode: {data.status}</p>
                <p style={{fontWeight:' 800'}}>
                  Organisasjonsnummer skal inneholde 9-siffer, du tastet {searchTerm.length}-siffer.<br/> Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv
                  igjen.<br/>
                  
                </p>
                </span>
                </div>
                
                
            
                
                
              </div>
            </div>
          );
        }
       
        else {
          console.log('Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv igjen.')
          return setShowData(
            <div className="row">
              <div className=" border-right">
              <div className="alert alert-danger" role="alert">
              <span className="text-center">
                <h1>Noe gikk galt!</h1><p>Status kode: {data.status}</p>
                <p style={{fontWeight:' 800'}}>
                  Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv
                  igjen.
                </p>
                </span>
                </div>
              </div>
            </div>
          );
        }
      })
      .catch((error) => {
        setShowInfoText(true);
  
        console.log('Organisasjonsnummer eksisterer ikke.')
          return setShowData(
            <div className="row">
              <div className=" border-right">
              <div className="alert alert-danger" role="alert">
              <span className="text-center">
                <h1>Noe gikk galt!</h1><p>Status kode: {data.status}</p>
                <p style={{fontWeight:' 800'}}>
                  Organisasjonsnummer eksisterer ikke. Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv
                  igjen. - {searchTerm}
                </p>
                </span>
                </div>
                
                
            
                
                
              </div>
            </div>
          
        );
      });
  };

  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectedChange = (e) => {
    setSelectedOption({
      multiValue: [...e.target.selectedOptions].map((o) => o.value),
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setRegisterButton(false);

    setPage(page + 1);
    try {
      await setDoc(doc(db, "enhetsRegisteret", userID), {
        uid: userID,
        ...enhetsRegisteretAPIData,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCompanyInfo = async (e) => {
    e.preventDefault();
    setRegisterButton(false);
    try {
      await setDoc(doc(db, "company", userID), {
        uid: userID,
        ...data,
        ...openingsData,
        ...aboutUs,
        ...industryData,
        ...country,
        ...phoneNumber,
        ...socialMedia,
        ...companiesAgreements,
        ...performsTrucks,
        images:imagesData,
        companyLogo: data.companyLogo ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",

        createdAt: serverTimestamp(),
      });

      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSocialInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setSocialMedia({ ...socialMedia, [id]: value });
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonName}
      </Button>

      <div>
        <Modal show={show} onHide={handleClose}>
          {page === 1 && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Data fra Enhetsregisteret</Modal.Title>
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
                <form >
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
                </form >
              </Modal.Body>

              <Modal.Footer>
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
              <Modal.Header closeButton>
                <Modal.Title>Register bedriftsinformasjon</Modal.Title>
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
              <Modal.Header closeButton>
                <Modal.Title>Register bedriftsinformasjon 1/3</Modal.Title>
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
                        Bilde: <CloudUploadOutlinedIcon className="icon" />
                      </label>

                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-6" key="orgNumber">
                        <label className="labels">Organisasjonsnummer</label>
                        <input
                          type="text"
                          id="orgNumber"
                          style={{ backgroundColor: "#dde2eb" }}
                          readOnly
                          className="form-control"
                          value={searchTerm }
                          onChange={handleInput}
                        />
                      </div>

                      <div className="col-md-6" key="CEO">
                        <label className="labels">Dagligleder</label>
                        <input
                          type="text"
                          placeholder="Ola Nordmann"
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
                          placeholder="Bilpleie AS"
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
                          placeholder="post@bilpleie.no"
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
                         // onChange={handleInput}
                          onChange={(value) => setPhoneNumber({ value })}
                          className="form-control"
                          defaultCountry="no"
                          onlyCountries={["no", "se", "dk", "is", "fi"]}
                          
                        />
                       
                        {/* <input  id ="phoneNumber" type="tel" placeholder="Telefon nummer" {...register("phone",  {required: true, pattern:[/^[0-9+-]+$/, /[^a-zA-Z]/], minLength: 8, maxLength: 12})}    onChange={handleInput}/>
                {errors?.phone && errors.phone.message} */}
                      </div>

                      <div className="col-md-6" key={countries.value}>
                        <label className="labels">Land</label>

                        <Select
                          placeholder="Velg land..."
                          defaultValue={countries[0]}
                          onChange={(value) => setCountry({ country: value })}
                          options={countries}
                          name="country"
                          id="country"
                          closeMenuOnSelect={true}
                        />
                       
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6" key="address">
                        <label className="labels">Adresse</label>
                        <input
                        {...register("address", { required: true })}
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Oslo Gate 33"
                          onChange={handleInput}
                        />
                        {errors.country && (
                          <span style={{ color: "red" }} role="alert">
                            Adresse: Dette feltet er obligatorisk!
                          </span>
                        )}
                      </div>

                      <div className="col-md-3" key="city">
                        <label className="labels">Sted</label>
                        <input
                        {...register("city", { required: true })}
                          type="text"
                          id="city"
                          name="city"
                          className="form-control"
                          placeholder="Oslo"
                          onChange={handleInput}
                        />
                        {errors.country && (
                          <span style={{ color: "red" }} role="alert">
                            Sted: Dette feltet er obligatorisk!
                          </span>
                        )}
                      </div>

                      <div className="col-md-3" key="zipCode">
                        <label className="labels">Postnummer</label>
                        <input
                        {...register("zipCode", { required: true })}
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          className="form-control"
                          placeholder="1069"
                          onChange={handleInput}
                        />
                        {errors.country && (
                          <span style={{ color: "red" }} role="alert">
                            Postnummer: Dette feltet er obligatorisk!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-12" key="industry">
                        <label className="labels">Bransje</label>

                        <Select
                        // {...register("industry", { required: true })}
                          placeholder="Legg til bransje"
                          isMulti
                          defaultValue={selectedOption}
                          onChange={(value) =>
                            setIndustryData({
                              industry: value.map((c) => c.value),
                            })
                          }
                          options={options}
                          name="industry"
                          id='industry'
                        />
                        {/* {errors.country && (
                          <span style={{ color: "red" }} role="alert">
                            Bransje: Dette feltet er obligatorisk!
                          </span>
                        )} */}
                      </div>
                    </div>

                    <div className="" style={{ margin: "10px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input "
                        id="performsTrucks"
                        onChange={(e) => setPerformsTrucks(e.value)}
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
                        onChange={(e) => setCompaniesAgreements(e.value)}
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

                    {/*
        <button type="submit"  className="btn btn-primary profile-button">Save data</button> */}
                  </div>
                </Modal.Body>
                <Modal.Footer>
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
              <Modal.Header closeButton>
                <Modal.Title>Register bedriftsinformasjon 2/3</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProgressBar
                  now={70}
                  variant="success"
                  style={{ margin: "10px" }}
                  label={`70%`}
                />

                <div className="row mt-2">
                  <div className="col-md-3" >
                    <label className="labels">Nettside</label>
                    <input
                      type="text"
                      id="website"
                      placeholder="www.nettside.no"
                      className="form-control"
                      onChange={handleSocialInput}
                    />
                  </div>

                  <div className="col-md-3" >
                    <label className="labels">Instagram</label>
                    <input
                      type="text"
                      id="instagram"
                      className="form-control"
                      placeholder="@instagram"
                      onChange={handleSocialInput}
                    />
                  </div>

                  <div className="col-md-3" >
                    <label className="labels">Facebook</label>
                    <input
                      type="text"
                      id="facebook"
                      className="form-control"
                      placeholder="www.facebook.com"
                      onChange={handleSocialInput}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="labels">Youtube</label>
                    <input
                      type="text"
                      id="youtube"
                      className="form-control"
                      placeholder="www.youtube.com"
                      onChange={handleSocialInput}
                    />
                  </div>
                </div>

                {inputList.map((x, i) => {
                  return (
                    <div className="row mt-2">
                      <div className="col-md-2" key={i}>
                        <input
                          name="openingDays"
                          style={{ height: "55px", textAlign: "center" }}
                          className="form-control"
                          value={weekDays[i]}
                          readOnly
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="col-md-5" key={x}>
                          <label className="labels"></label>

                          <TimePicker
                            renderInput={(params) => <TextField {...params} />}
                            value={date}
                            label="Åpningstid"
                            onChange={(newValue) => {
                              setDate(newValue);
                            }}
                            className="form-control"
                            minTime={dayjs("2022-04-07T10:15")}
                            maxTime={dayjs("2022-04-07T10:15")}
                          />
                        </div>
                        <div className="col-md-5" >
                          <label className="labels"></label>
                          <TimePicker
                            renderInput={(params) => <TextField {...params} />}
                            value={date}
                            label="Stengetid"
                            onChange={(newValue) => {
                              setDate(newValue);
                            }}
                            className="form-control"
                            minTime={dayjs("2018-01-01T08:00")}
                            maxTime={dayjs("2018-01-01T18:45")}
                          />
                        </div>
                      </LocalizationProvider>

                      {/*
            <input
              className='form-control'
              name="openingHours"
              pattern="[0-9]{2}:[0-9]{2}"
              value={x.openingHours}
              defaultValue='08:00'
              onChange={e => handleInputChange(e, i)}
              type='time'
            /> */}

                       <div className="col-md-2 border-end  d-flex justify-content-left align-items-center"  key='opningDays' style={{ display: "flex", justifyContent: "start" }}>
              {inputList.length !== 1 && <DeleteIcon
                className="mr10"
                onClick={() => handleRemoveClick(i)}/>}
              {inputList.length - 1 === i && <AddBoxIcon hidden={hiddeAddIcon} onClick={handleAddClick}/>}
            </div> 
                    </div>
                  );
                })}
              </Modal.Body>
              <Modal.Footer>
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
                      onClick={handlePageFourNextPage}
                    >
                      Gå videre
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </>
          )}
          {page === 5 && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Register bedriftsinformasjon 3/3</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProgressBar
                  now={100}
                  variant="success"
                  style={{ margin: "10px" }}
                  label={`100%`}
                />

                <div className="row mt-3">
                  <div className="col-md" key="about">
                    <label className="labels">Om oss</label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ height: "200px" }}
                      placeholder="Om oss ...."
                      id="about"
                      onChange={(e) => setAboutUs(e.value)}
                    />
                  </div>
                </div>

                <RMIUploader
                  isOpen={visible}
                  hideModal={hideModal}
                  onSelect={onUpload}
                  onUpload={onUpload}
                  onRemove={onRemove}
                  dataSources={dataSources}
                  onChange={onUpload}
                />
              </Modal.Body>
              <div className="row mt-2">
                <Modal.Footer>
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary" onClick={handlePrevPage}>
                        Tilbake
                      </Button>
                    </div>
                    <div className="col">
                      <Button onClick={handleAddCompanyInfo} variant="success">
                        Lager
                      </Button>
                    </div>
                  </div>
                </Modal.Footer>
              </div>
            </>
          )}
          {page === 6 && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Register bedriftsinformasjon 3/3</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProgressBar
                  now={100}
                  variant="success"
                  style={{ margin: "10px" }}
                  label={`100%`}
                />

                <div className="row mt-3">
                  <div className="col-md" key="about">
                    <label className="labels">Om oss</label>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ height: "200px" }}
                      placeholder="Om oss ...."
                      id="about"
                      onChange={(e) => setAboutUs(e.value)}
                    />
                  </div>
                </div>

                <RMIUploader
                  isOpen={visible}
                  hideModal={hideModal}
                  onSelect={onUpload}
                  onUpload={onUpload}
                  onRemove={onRemove}
                  dataSources={dataSources}
                  onChange={onUpload}
                />
              </Modal.Body>
              <div className="row mt-2">
                <Modal.Footer>
                  <div className="row ">
                    <div className="col">
                      <Button variant="secondary" onClick={handlePrevPage}>
                        Tilbake
                      </Button>
                    </div>
                    <div className="col">
                      <Button onClick={handleAddCompanyInfo} variant="success">
                        Lager
                      </Button>
                    </div>
                  </div>
                </Modal.Footer>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}
export default RegistrationForm;
