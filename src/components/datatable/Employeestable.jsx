import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { employeesColums } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import React  from 'react';
import { getAuth} from "firebase/auth";
import { db } from "../../firebase";
export const auth = getAuth();

const Employeestable = ({pageTitle}, props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  
 
  useEffect(() => {
    // LISTEN (REALTIME)
 
  
    const unsub = onSnapshot(
      
      collection(db, "employees"),
      (snapShot) => {
        let list = [];

        
          snapShot.docs.forEach((doc) => {
           
           
            if(doc.data().userID === auth.currentUser.uid){
              list.push({ id: doc.id, ...doc.data() });
              
          }
         
          });
        setData(list);
      },

      (error) => {
        console.log(error);
        
      }
    );

    return () => {
      unsub();
    }
  },);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "employees", id));
      setData(data.filter((item) => item.id === id));
    } catch (err) {
      console.log(err);
    }
  };


  const viewDetails = async (id) => {
 
    const ref = doc(db, 'employees', id);
    console.log('No users')
    const snapDoc = await getDoc(ref);
    navigate(`/employees/${id}`, {state:{data:snapDoc.data()}})  


      
     
  }
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
      

         
              
              <div className="cellAction">
                  <h3>Din bruker</h3>
                  <div className="viewButton" onClick={() => viewDetails(params.row.id)}>Se detaljer</div>
               
                
              </div>
           
       

        
   
          return (
            <div className="cellAction">
             
                <div className="viewButton" onClick={() => viewDetails(params.row.id)}>Se detaljer</div>
             
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Slett 
              </div>
            </div>
          );

       
      
      },
    },
  ];
  return (
    
    <div className="datatable">
      <div className="datatableTitle">
        {pageTitle}
        <Link to="/employees/new" className="link">
        Legg til ny
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={employeesColums.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Employeestable;
