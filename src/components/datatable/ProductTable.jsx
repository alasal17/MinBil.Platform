import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db, auth } from "../../firebase";

const ProductTable = ({pageTitle}) => {
  const [data, setData] = useState([]);

  const [description, setDescription ] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "products"),
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
    };
  }, []);

  const handleUpdate = async (id) => {


    console.log(data);
    
        
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/products/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Se detaljer</div>
            </Link>
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
            
              className="deleteButton"
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
