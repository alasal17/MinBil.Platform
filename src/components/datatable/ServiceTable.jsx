import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { servicesColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

import { db } from "../../firebase";
import React  from 'react';
import { AuthContext} from "../../context/AuthContext";


const ServiceTable = ({pageTitle}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)
  const user = currentUser.uid;
  const [pricesData, setPricesData] = useState([])
  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().uid === user){
          
          list.push({ id: doc.id,smallCar: doc.data().price.smallCar, normalCar: doc.data().price.normalCar,bigCar: doc.data().price.bigCar,calculatedEstimatedTime:doc.data().calculatedEstimatedTime, ...doc.data() });
          setPricesData({price: doc.data().price})
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
    navigate(`/service/${id}`, {state:{data:snapDoc.data()}})   
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
            
            <Link to="/service" style={{ textDecoration: "none" }}>
            <div
            
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Slett 
            </div>
            </Link>

            <Link to="/service/update" style={{ textDecoration: "none" }}>
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
        <Link to="/service/new-service" className="link">
        Legg til ny
        </Link>

        

      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={servicesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ServiceTable;
