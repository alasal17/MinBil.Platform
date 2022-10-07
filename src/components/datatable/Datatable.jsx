import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { employeesColums, userColumns } from "../../datatablesource";
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
export const auth = getAuth();

const Datatable = ({pageTitle}, props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser.uid;
 
  useEffect(() => {
    // LISTEN (REALTIME)
 
  
    const unsub = onSnapshot(
      
      collection(db, "employees"),
      (snapShot) => {
        let list = [];

        
          snapShot.docs.forEach((doc) => {

            if (doc.data().uid == user){
        
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
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "employees", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  const viewDetails = async (id) => {
 
    const ref = doc(db, 'employees', id);
    console.log('No users')
    const snapDoc = await getDoc(ref);
    navigate('/users/test', {state:{data:snapDoc.data()}})  


      
     
  }
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
      

          if(params.row.role === "admin" && user === params.row.uid){
            return (
              
              <div className="cellAction">
                  <h3>Din bruker</h3>
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
        columns={employeesColums.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
