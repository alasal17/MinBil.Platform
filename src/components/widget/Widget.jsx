import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import React from 'react';
import { getAuth} from "firebase/auth";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
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
  const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

  useEffect(   () => {
    async function fetchData() {
     
      const auth = getAuth();
      
      
     
      const lastMonthQuery = await query(
      
        collection(db,  data.query),
        
        where("createdAt", "<=", today),
        where("createdAt", ">", lastMonth)

    
        
      );
      
      const prevMonthQuery =  await query(
        await  collection(db, data.query),
          where("createdAt", "<=", lastMonth),
          where("createdAt", ">", prevMonth)

      );
      console.log()
      // await console.log(data)

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
        fetchData()}
  };
  fetchData()



}, []);
  
  console.log()
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
