import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { employeesColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query, 
  setDoc,
  addDoc,
    where,
    serverTimestamp
} from "firebase/firestore";
import Moment from 'moment';
import React  from 'react';
import { getAuth} from "firebase/auth";
import { db, storage  } from "../../firebase";
import Popup from "../popup/Popup";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export const auth = getAuth();

const Employeestable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const [registerButton, setRegisterButton] = useState(false)
  const [file, setFile] = useState("");


  const [per, setPerc] = useState(null);

  const postsCollectionRef = collection(db, "employees");
  useEffect(() => {
    // LISTEN (REALTIME)
 
  
    const unsub = onSnapshot(
      
      collection(db, "employees"),
      (snapShot) => {
        let list = [];
        
        
          snapShot.docs.forEach((doc) => {
           
           
            if(doc.data().uid === auth.currentUser.uid){
              
              // let hiredDate = Moment(doc.data().hiredDate.toDate).format('DD-MM-YYYY')
            
              list.push({ id: doc.id,  'fulName': doc.data().fulName, 'hiredDate': doc.data().hiredDate, 'imageUrl': doc.data().imageUrl, 'email': doc.data().email, 'address': doc.data().address, 'phoneNumber': doc.data().phoneNumber, 'role': doc.data().role , 'status': doc.data().status   });
              
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
  },[]);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, imageUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
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
    
    const snapDoc = await getDoc(ref);
    navigate(`/employee/${id}`, {state:{data:snapDoc.data()}})  


      
     
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      
      await addDoc(postsCollectionRef, {
        ...data,
        status:'true',
        createdAt: serverTimestamp(),
        uid:  auth.currentUser.uid,
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  
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

    <div>
    
    <div className="datatable">
      <div className="datatableTitle">
       
        <div className="col-sm-12">
                      <button className="btn btn-info "  onClick={() => setRegisterButton(true)}>Registrer deg</button>
                    </div>
                    
      </div>
    <div>

    </div>
 
      <DataGrid
        className="datagrid"
        rows={data}
        columns={employeesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    
    </div>
    <Popup trigger={registerButton} setTrigger={setRegisterButton}> 


    <form onSubmit={handleAdd}>
    <div className="row">
        <div className="col-md-3 border-right">
        
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img 
              src={
                
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="" className="rounded-circle mt-5" width="150px" 
            />
            
                    {/* <span className="font-weight-bold">Bedriftslogo</span><span> </span> */}
                    <div className="col-md-6 mt-4 text-center">
                    
                    <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
        </div></div></div>
        
        
        <div className="col-md-5 border-right">
        
            <div className="p-3 py-5">
                {/* <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profil skjema</h4>
                </div> */}
                
                <div className="row mt-2">
             
                    <div className="col-md-12" key='fulName'><label className="labels">Full Navn</label>
                    <input type="text" id ="fulName" className="form-control"  placeholder="Ola Nordmann" onChange={handleInput} /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12" key='address'><label className="labels">Adresse</label>
                    <input type="text" id="address" className="form-control" placeholder="Oslo Gate 33" onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='email'><label className="labels">E-post</label>
                    <input  type="text" id="email" className="form-control" placeholder="epost ..."  onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='phoneNumber'><label className="labels">Telefon nummer</label>
                    <input  id ="phoneNumber"type="text" className="form-control" placeholder="telefon ..." onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='hiredDate'><label className="labels">Anstatelses dato</label>
                    <input type="text" id ="hiredDate"  className="form-control" onChange={handleInput}/></div>
                    
                    <div className="col-md-12" key='role'><label className="labels">Rolle</label>
                    <input type="text" id ="role" className="form-control" placeholder="Mekaniker ..."  onChange={handleInput}/></div>
                    
                  
            
                
                </div>
            
                <div className='row mt-3'>
                <div className="col-md-6 mt-4 text-center">
                  <button className="btn btn-primary profile-button"disabled={per !== null && per < 100} type="submit">Lagre</button>
                  </div>
                <div className="col-md-6 mt-4 text-center">
                <button className="btn btn-primary profile-button" type="button" onClick={ e => setRegisterButton(false)}>
                Avslutt</button></div>
                </div>
                
            </div>
          
        </div>
        
   
            </div>
    
   
    </form>
        </Popup>    </div>
  );
};

export default Employeestable;
