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
import { db } from "../../firebase";
import React  from 'react';
import { auth} from "../../firebase";


const EventTable = ({pageTitle}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [registerButton, setRegisterButton] = useState(false)
  
    
  // useEffect(() => {
  //   // LISTEN (REALTIME)
  //   const unsub = onSnapshot(
  //     collection(db, "offer"),
  //     (snapShot) => {
  //       const user = auth.currentUser.uid;
  //       const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
  //       let list = [];
  //       snapShot.docs.forEach((doc) => {
       
  //         if (doc.data().uid === user){
          
  //         list.push({ id: doc.id, ...doc.data() });
  //         }
          
  //       })
  //       setData(list);
  //       clearTimeout(timer)
       
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   ) 
    
   


  //   return () => {
  //     unsub();
      
  //   };
  // }, []);

  const handleUpdate = async (id) => {
   
  }

  const viewDetails = async (id) => {
    
    const ref = doc(db, 'offer', id);
    const snapDoc = await getDoc(ref);
    navigate(`/calender/${id}`, {state:{data:snapDoc.data()}})   
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "offer", id));
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
    <div>
      
      <div className="datatableTitle">
        {pageTitle}
        

        

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
