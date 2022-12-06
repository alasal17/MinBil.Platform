import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import React from 'react';
import { getAuth} from "firebase/auth";
import { AuthContext} from "../../context/AuthContext";
const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  const {currentUser} = useContext(AuthContext)
  const [data2, setData2] = useState({});
  let data;
  
 
  switch (type) {
    case "employees":
      data = {
        title: "BRUKERE",
        isMoney: false,
        query:"employees",
        link: "Se alle brukere",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "BESTILLINGER I DAG",
        isMoney: false,
        query:"booking",
        link: "Se alle bestillinger",
        icon: (
          <CalendarViewMonthIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "INNTJENING",
       
        isMoney: true,
        link: "Se nettoinntekter",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "services":
      
    
      data = {
        title: "TJENESTER",
        query:"services",
        link: "Se detaljer",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  };

  const today = new Date();
  const lastMonth = new Date(new Date().setMonth(today.getMonth()));
  // const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

  useEffect(   () => {
    async function fetchData() {
     
      const auth = getAuth();
     
    
    
      const lastMonthQuery = await  query(
        await collection(db, data.query),
        where("uid", '==', currentUser.uid)
        // ,where("createdAt", "==", lastMonth)
        );
      
      const prevMonthQuery =  query(
        collection(db, data.query),
        where("uid", '==', currentUser.uid)
        // where("createdAt", "==", lastMonth)
     
       
      );



      const lastMonthData =  await getDocs(lastMonthQuery);
      const prevMonthData =  await getDocs(prevMonthQuery);

      setAmount(await lastMonthData.docs.length);
      setDiff(
         (( await lastMonthData.docs.length -  prevMonthData.docs.length) /  prevMonthData.docs.length) *
          100
      );

      // console.log(lastMonthQuery.withConverter())
      // // lastMonthData.docs.forEach( doc =>{
      // //   console.log(doc.id, '=>', doc.data())
      // // })
      
  
      return () => {
        fetchData();
      }
  };
 



}, []);
  

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "kr"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
          {diff} %
        </div>
        {data.icon}
        
      </div>
    </div>
  );
};

export default Widget;
