import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
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


const Datatable = ({pageTitle}, props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id).where("roles" != "admin"));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  const viewDetails = async (id) => {
    
    const ref = doc(db, 'users', id);
    const snapDoc = await getDoc(ref);
    navigate('/users/test', {state:{data:snapDoc.data()}})   
  }
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if(params.row.roles === "admin"){
          return (
            <div className="cellAction">
             
                <div className="viewButton" onClick={() => viewDetails(params.row.id)}>Se detaljer</div>
             
              
            </div>
          );

        }
        else{
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

        }
      
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {pageTitle}
        <Link to="/users/new" className="link">
        Legg til ny
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
