import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from 'react';
import {
  collection,
  onSnapshot,
  where,
  query
} from "firebase/firestore";
import { useContext, useState,useEffect } from "react";
import { AuthContext} from "../../context/AuthContext";
import { db} from "../../firebase";




const data = [
  { name: "Oktober", Total: 1200 },
  { name: "November", Total: 2100 },
  { name: "Desember", Total: 800 },
  { name: "Januar", Total: 1600 },
  { name: "Februar", Total: 900 },
  { name: "Mars", Total: 1700 },
];



const Chart = ({ aspect, title }) => {
  const {currentUser} = useContext(AuthContext)
  const [colorTheme, setColorTheme] = useState('green-theme');
  const [cTheme, setCTheme] = useState('');

  const userID = currentUser.uid;


  useEffect(() => {
    // LISTEN (REALTIME)
   
    const unsub = onSnapshot(
      collection(db, "userTheme"),
      (snapShot) => {
        let list = [];
  
        snapShot.docs.forEach((doc) => {
            if(doc.id === userID){
              list.push({id: doc.id, ...doc.data()});
          }
          setColorTheme(list)

          setCTheme(...colorTheme)
  
         
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
  }, );

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={280}
          data={data}
          margin={{ top: 10, right: 0, left: 120, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={ '#13547a'} stopOpacity={0.8} />
              <stop offset="95%" stopColor={'#13547a'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
