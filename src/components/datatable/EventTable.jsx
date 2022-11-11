import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { eventsColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import React, { Component }  from 'react';
import { auth, storage } from "../../firebase";


const EventTable = ({pageTitle}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  
    
  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "events"),
      (snapShot) => {
        const user = auth.currentUser.uid;
        const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().uid === user){
          
          list.push({ id: doc.id, ...doc.data() });
          }
          
        })
        setData(list);
        clearTimeout(timer)
       
      },
      (error) => {
        console.log(error);
      }
    ) 
    
   


    return () => {
      unsub();
      
    };
  }, []);

  const handleUpdate = async (id) => {
   
  }

  const viewDetails = async (id) => {
    
    const ref = doc(db, 'events', id);
    const snapDoc = await getDoc(ref);
    navigate('/calender/test', {state:{data:snapDoc.data()}})   
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            
              <div className="viewButton" onClick={() => viewDetails(params.row.id)}>Se detaljer</div>
            
            <Link to="/calender" style={{ textDecoration: "none" }}>
            <div
            
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Slett 
            </div>
            </Link>

            <Link to="/calender/update" style={{ textDecoration: "none" }}>
            <div
            
              className="updateButton"
              onClick={() => handleUpdate(params.row.id)}
            >
              Update 
            </div>
            </Link>

          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {pageTitle}
        <Link to="/calender/new" className="link">
        Legg til ny
        </Link>

        

      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={eventsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default EventTable;
