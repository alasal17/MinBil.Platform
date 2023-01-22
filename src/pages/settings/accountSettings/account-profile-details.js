import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Avatar,

  CardActions,


  Typography
} from "@mui/material";
import {
  doc,
  collection,
  serverTimestamp,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import MuiPhoneInput from "material-ui-phone-number";
import { auth, db, storage } from "../../../firebase";
import { data } from "jquery";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

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
  { label: "Island", value: "is" },
  { label: "Finland", value: "fi" },
];


export const AccountProfileDetails = (props) => {
  const [performsTrucks, setPerformsTrucks] = useState(false);
  const [companiesAgreements, setCompaniesAgreements] = useState(true);
  let industry_list = [];
  const [companyData, setCompanyData] = useState([{}]);
  const [industryType, setIndustryType] = useState([]);
  const [file, setFile] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {

    const id = event.target.id;
    const value = event.target.value;
    const name = event.target.name;
    setCompanyData([...companyData,{
      
      [name]: value,
    }]);

    console.log(companyData);
  };

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    // LISTEN (REALTIME)

    const unsub = onSnapshot(
      collection(db, "company"),
      (snapShot) => {
        let list = [];
        

        snapShot.docs.forEach((doc) => {
          // list.push({ id: doc.id, ...doc.data() });
          if (doc.id === currentUser.uid) {
            list.push({ id: doc.id, ...doc.data() });
            industry_list.push(doc.data().industryType)
          }
        });

        
        setCompanyData(list);
        setIndustryType(...industry_list)
        setCompaniesAgreements(companyData[0].companiesAgreements)
        setPerformsTrucks(companyData[0].performsTrucks)
        console.log(...industryType);
      },

      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleCompaniesAgreementsChange = () => {
    setCompaniesAgreements(!companiesAgreements);
  };

  const handlePerformsTrucksChange = () => {
    setPerformsTrucks(!performsTrucks);
  };
  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(value); // selected options
};

  return (
    <form autoComplete="off" noValidate {...props}>
    
      
     
      <Card>
        
        <CardHeader subheader="Informasjonen kan redigeres" title="Profil" />
        
        <Divider />
        <CardContent>

        <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                      className="rounded companyInfoAccountCompanyLogo mx-auto d-block rounded-circle mt-5"
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
          
            <div className="col-md-6">
              <label className="labels">Org. nummer</label>
              <input
                name="orgNumber"
                onChange={handleChange}
                defaultValue={companyData[0].orgNumber}
                className="form-control"
              />
            </div>
          
            <div className="col-md-6">
            <label className="labels">Bedriftsnavn</label>
              <input
                name="companyName"
                onChange={handleChange}
                className="form-control"
                defaultValue={companyData[0].companyName}
              />
            </div>
          
          </div>
          
          
          <div className="row mt-2">
          
            <div className="col-md-6">
            <label className="labels">E-post</label>
              <input
                name="email"
                onChange={handleChange}
                className="form-control"
                defaultValue={companyData[0].email || ""}
         
              />
            </div>
            <div className="col-md-6">
            <label className="labels">Telefon nummer</label>
             
            {/* <MuiPhoneInput
                          name="phoneNumber"
                          // onChange={handleInput}
                          defaultValue={companyData[0].phoneNumber}
                          className="form-control companyInfoAccountPhoneNumber"
                          defaultCountry="no"
                          onlyCountries={["no", "se", "dk", "is", "fi"]}
                        /> */}
         

            
             
              <input
                name="phoneNumber"
                onChange={handleChange}
                type="tel"
                className="form-control"
                defaultValue={companyData[0].phoneNumber || ""}
              />
            </div>

          </div>


          <div className="row mt-2">
          
            <div className="col-md-3">
            <label className="labels">Gate adresse</label>
              <input
                name="streetAddress"
                onChange={handleChange}
                className="form-control"
                defaultValue={companyData[0].streetAddress || ""}
         
              />
            </div>
            <div className="col-md-3">
            <label className="labels">Område</label>
              <input
                 name="region"
                onChange={handleChange}
                type="text"
                className="form-control"
                defaultValue={companyData[0].region || ""}
              />
            </div>

            <div className="col-md-3">
            <label className="labels">Postnummer</label>
              <input
                name="zipCode"
                onChange={handleChange}
                type="text"
                className="form-control"
                defaultValue={companyData[0].zipCode || ""}
              />
            </div>

            <div className="col-md-3">
            <label className="labels">Land</label>
            <TextField
              fullWidth
              className="form-control companyInfoAccount"
              name="country"
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              
              variant="outlined"
            >
              {countries.map((option) => (
                <option key={option.value} defaultValue={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            </div>
            
          </div>

          <div className="row mt-2" >
                      <div className="col-md-12" key="industryType">
                        <label className="labels">
                          Bransje (må velge minst ett bransje)
                        </label>


                        <Select
                    className="companyInfoAccountIndustryType"
                          id="industryType"
                          placeholder="Legg til bransje"
                          isMulti
                        
                          defaultValue={{...industryType}}
                          options={options}
                          name="industryType"
                        />


                       
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



          <Grid item md={3} xs={12}>
            
          </Grid>
        </CardContent>
        <Divider />
         <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" >
            Lagre endringen
          </Button>
        </Box> 
      </Card>


     
    </form>
  );
};
