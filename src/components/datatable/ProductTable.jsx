import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../datatablesource";
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

export const auth = getAuth();

const ProductTable = ({pageTitle}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser.uid;

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().userID == user){
          
          list.push({ id: doc.id, ...doc.data() });
          }
          
        })
        setData(list);
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
    console.log()
    console.log(data);
  }

  const viewDetails = async (id) => {
    
    const ref = doc(db, 'services', id);
    const snapDoc = await getDoc(ref);
    navigate('/products/test', {state:{data:snapDoc.data()}})   
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "services", id));
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
            
            <Link to="/products" style={{ textDecoration: "none" }}>
            <div
            
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Slett 
            </div>
            </Link>

            <Link to="/products/update" style={{ textDecoration: "none" }}>
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
        <Link to="/products/new" className="link">
        Legg til ny
        </Link>

        

      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductTable;
