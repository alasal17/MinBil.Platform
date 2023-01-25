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


export const AccountOpeningHoursDetails = (props) => {
  const [performsTrucks, setPerformsTrucks] = useState(false);
  const [companiesAgreements, setCompaniesAgreements] = useState(true);
  let industry_list = [];
  const [companyData, setCompanyData] = useState([{}]);
  const [industryType, setIndustryType] = useState([]);
  const [file, setFile] = useState("");
  const [openingsData, setOpeningsData] = useState([]);

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


  };

  const { currentUser } = useContext(AuthContext);



  const [colorTheme, setColorTheme] = useState('green-theme');
  const userID = currentUser.uid;


  useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      collection(db, "userTheme"),
      (snapShot) => {
        let list = [];
  
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          //   if(doc.id === userID){
          //     list.push({id: doc.id, ...doc.data()});
          // }
          
  
          if (doc.id === userID) {
            setColorTheme(list)
  
            console.log(colorTheme)
        
          } else {
  
            console.log('Faild')
          }
        });
  
       console.log()
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
    // LISTEN (REALTIME)

    const unsub = onSnapshot(
      collection(db, "company"),
      (snapShot) => {
        let list = [];
        let openingsData_list = [];

        snapShot.docs.forEach((doc) => {
          // list.push({ id: doc.id, ...doc.data() });
          if (doc.id === currentUser.uid) {
            list.push({ id: doc.id, ...doc.data() });
            industry_list.push(doc.data().industryType)
            openingsData_list.push(doc.data().openingHours)
          }
        });

        
        setCompanyData(list);
        setIndustryType(...industry_list)
        setCompaniesAgreements(companyData[0].companiesAgreements)
        setPerformsTrucks(companyData[0].performsTrucks)
        setOpeningsData(openingsData_list)

        

        
      },

      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, );

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
        
        <CardHeader subheader="Informasjonen kan endres" title="openingHours" />
        
        <Divider />
        <CardContent className={`${colorTheme[0].backgroundColor}`}>



{openingsData.map((e) => (

<div className={``}>

{/* ---------------------------------------------------------------------------- */}
          <div className={`row mt-2 `}>
          
            <div className="col-md-4">
            <label className="labels">Dag</label>
              <input
                name="Mandag"
                onChange={handleChange}
                className="form-control"
                value={"Mandag"}
                readOnly
         
              />
            </div>
            <div className="col-md-4">
            <label className="labels">Åpningstid</label>
              <input
                 name="mandagOpen"
                onChange={handleChange}
                type="text"
                className="form-control"
                defaultValue={ e.Mandag.open ?? ''}
              />
            </div>

            <div className="col-md-4">
            <label className="labels">Stengetid</label>
              <input
                name="mandagClose"
                onChange={handleChange}
                type="text"
                className="form-control"
                defaultValue={e.Mandag.close}
              />
            </div>

           
            
          </div>



          {/* ---------------------------------------------------------------------------- */}
          <div className="row mt-2">
          
          <div className="col-md-4">
          <label className="labels">Dag</label>
            <input
              name="tirsdag"
              onChange={handleChange}
              className="form-control"
              value={"Tirsdag"}
              readOnly
       
            />
          </div>
          <div className="col-md-4">
          <label className="labels">Åpningstid</label>
            <input
               name="tirsdagOpen"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Tirsdag.open}
            />
          </div>

          <div className="col-md-4">
          <label className="labels">Stengetid</label>
            <input
              name="tirsdagClose"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Tirsdag.close}
            />
          </div>

        </div>
          

        {/* ---------------------------------------------------------------------------- */}
          <div className="row mt-2">
          
          <div className="col-md-4">
          <label className="labels">Dag</label>
            <input
              name="Onsdag"
              onChange={handleChange}
              className="form-control"
              value={"Onsdag"}
              readOnly
       
            />
          </div>
          <div className="col-md-4">
          <label className="labels">Åpningstid</label>
            <input
               name="onsdagOpen"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Onsdag.open}
            />
          </div>

          <div className="col-md-4">
          <label className="labels">Stengetid</label>
            <input
              name="onsdagClose"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Onsdag.close}
            />
          </div>

        </div>

        {/* ---------------------------------------------------------------------------- */}
          <div className="row mt-2">
          
          <div className="col-md-4">
          <label className="labels">Dag</label>
            <input
              name="Torsdag"
              onChange={handleChange}
              className="form-control"
              value={"Torsdag"}
              readOnly
       
            />
          </div>
          <div className="col-md-4">
          <label className="labels">Åpningstid</label>
            <input
               name="torsdagOpen"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Torsdag.open}
            />
          </div>

          <div className="col-md-4">
          <label className="labels">Stengetid</label>
            <input
              name="torsdagClose"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Torsdag.close}
            />
          </div>

        </div>

        {/* ---------------------------------------------------------------------------- */}
          <div className="row mt-2">
          
          <div className="col-md-4">
          <label className="labels">Dag</label>
            <input
              name="Fredag"
              onChange={handleChange}
              className="form-control"
              value={"Fredag"}
              readOnly
       
            />
          </div>
          <div className="col-md-4">
          <label className="labels">Åpningstid</label>
            <input
               name="fredagOpen"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Fredag.open}
            />
          </div>

          <div className="col-md-4">
          <label className="labels">Stengetid</label>
            <input
              name="fredagClose"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Fredag.close}
            />
          </div>

        </div>



        {/* ---------------------------------------------------------------------------- */}
          <div className="row mt-2">
          
          <div className="col-md-4">
          <label className="labels">Dag</label>
            <input
              name="Lørdag"
              onChange={handleChange}
              className="form-control"
              value={"Lørdag"}
              readOnly
       
            />
          </div>
          <div className="col-md-4">
          <label className="labels">Åpningstid</label>
            <input
               name="lørdagOpen"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Lørdag.open}
            />
          </div>

          <div className="col-md-4">
          <label className="labels">Stengetid</label>
            <input
              name="lørdagClose"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Lørdag.close}
            />
          </div>

        </div>

        {/* ---------------------------------------------------------------------------- */}
          <div className="row mt-2">
          
          <div className="col-md-4">
          <label className="labels">Dag</label>
            <input
              name="Søndag"
              onChange={handleChange}
              className="form-control"
              value={"Søndag"}
              readOnly
       
            />
          </div>
          <div className="col-md-4">
          <label className="labels">Åpningstid</label>
            <input
               name="søndagOpen"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Fredag.open}
            />
          </div>

          <div className="col-md-4">
          <label className="labels">Stengetid</label>
            <input
              name="søndagClose"
              onChange={handleChange}
              type="text"
              className="form-control"
              defaultValue={e.Fredag.close}
            />
          </div>

        </div>
        </div>
))}
<br/>
<hr className="companyInfoAccountOpeningHoursDivLine"/>

    <h3 className="text-center">Åpningstider på rød -og heldigdager </h3>
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
