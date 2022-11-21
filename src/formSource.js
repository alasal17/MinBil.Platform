import { useEffect, useState } from "react";
import { productsColumns } from './datatablesource';
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
export const ProductsData = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser.uid;
  const [services, setService] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().uid == user){
          
          list.push({ id: doc.id, ...doc.data() });
          }
          
        })
        setData(list);
        console.log(data)
        
        
      },
      (error) => {
        console.log(error);
      }
    )


    return () => {
      unsub();
      
    };
  }, []);

  useEffect(() => {
    setFilteredContacts(
      services.filter(
        (service) =>
        service.title.toLowerCase().includes(search.toLowerCase()) 
      )
    );
  }, [search, services]);



  
};


export const userInputs = [
    {
      id: "company",
      label: "Bedriftsnavn",
      type: "text",
      placeholder: "Bil Service AS",
    },
    {
      id: "display_name",
      label: "brukernavn",
      type: "text",
      placeholder: "BilService",
    },
    {
      id: "full_name",
      label: "Full Navn",
      type: "text",
      placeholder: "Ola Nordmann",
    },
    {
      id: "email",
      label: "E-post",
      type: "mail",
      placeholder: "olanordmann@gmail.com",
    },
    {
      id: "phone_number",
      label: "Telefon",
      type: "text",
      placeholder: "+47 234 67 089",
    },
    {
      id: "password",
      label: "Passord",
      type: "Passord",
    },
    {
      id: "role",
      label: "Rolle",
      type: "text",
      placeholder: "admin, reader, auther",
    },
    {
      id: "address",
      label: "Adresse",
      type: "text",
      placeholder: "Oslo gate, 1099 Oslo",
    },
    {
      id: "country",
      label: "Land",
      type: "text",
      placeholder: "Norge",
    },
  ];
  
  export const serviceInputs = [
    {
      id: "title",
      label: "Tittel",
      type: "text",
      placeholder: "Bil vask",
    },
    {
      id: "description",
      label: "Beskrivelse",
      type: "text",
      placeholder: "Grundig utvendig vask...",
    },
  
    {
      id: "price",
      label: "Pris",
      type: "int",
      placeholder: "100",
    },

    // {
    //   id: "tags",
    //   label: "Stikk ord",
    //   type: "options",
    //   name:'tags',
    //   placeholder: "bilvask, polering, dekkskift,...",
    // },

    {
      id: "estimatedTime",
      label: "Varighet",
      type: "int",
      placeholder: "45",
    },
   
   
  ];
  
  export const employeeInput = [
    
    {
      id: "fulName",
      label: "Full navn",
      type: "text",
      placeholder: "Ola Nordmann",
    },
    {
      id: "role",
      label: "Rolle",
      type: "text",
      placeholder: "Mekanikker",
    },
    {
      id: "phoneNumber",
      label: "Telefon number",
      type: "text",
      placeholder: "23467089",
    },
   
    {
      id: "hiredDate",
      label: "Ansatt siden",
      type: "date",
      placeholder: "01-01-1990",
    },
    {
      id: "email",
      label: "E-post",
      type: "mail",
      placeholder: "olanordmann@gmail.com",
    },
    {
      id: "address",
      label: "Adresse",
      type: "text",
      placeholder: "Oslo gate 14, 1087 Oslo",
    },
  ];

  export const productUpdate = [
    {
      id: "title",
      label: "Tittel",
      type: "text",
      placeholder: "Bil vask",
    },
    {
      id: "description",
      label: "Beskrivelse",
      type: "text",
      placeholder: "Grundig utvendig vask...",
    },
  
    {
      id: "price",
      label: "Pris",
      type: "text",
      placeholder: "100",
    },

    {
      id: "tags",
      label: "stikk ord",
      type: "text",
      placeholder: "bilvask, polering, dekkskift,...",
    },
   
   
  ];
 


  

  export const eventInput = [
    
    
    {
      id: 'title',
      label: "Tittel",
      type: "text",
      value:{ProductsData},
      placeholder:'' 
    },
    {
      id: "price",
      label: "Pris",
      type: "text",
      placeholder: "100",
    },
    {
      id: "date_start",
      label: "Start dato",
      type: "date",
      placeholder: "2022-11-08",
    },
    {
      id: "time_start",
      label: "Start tid",
      type: "time",
      placeholder: "13:00",
    },
    
  
 
  
    
   
   
  ];