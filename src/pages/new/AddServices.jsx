import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,

  serverTimestamp,

} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import React  from 'react';
import Dropdown from "./Dropdown";
import { integerPropType } from "@mui/utils";
const AddServices = ({ inputs, title}) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [tagsData, setTags] = useState([]);
  const navigate = useNavigate()
  const postsCollectionRef = collection(db, "services");

  
  const options = [
    { value: "dekkskift", label: "Dekkskift" },
    { value: "polering", label: "Polering" },
    { value: "service", label: "Service" },
    { value: "mekanikk", label: "Mekanikk" },
    { value: "bilvask", label: "Bilvask" },
    { value: "lakering", label: "Lakering" },
    { value: "eu-kontroll", label: "EU-Kontroll" },
    { value: "fjerne-rust", label: "Fjerne rust" },
    { value: "sjekk-lufttrykk", label: "Sjekk lufttrykk" }
  ];
  
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


  
  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
  
    if(id ==='price' || id === 'estimatedTime'){
      setData({ ...data, [id]: Number(value)})
    }

      
  
    else{
      setData({ ...data, [id]: value});}
  };


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      
      await addDoc(postsCollectionRef, {
        ...data,
        ...tagsData,
        createdAt: serverTimestamp(),
        uid:  auth.currentUser.uid,
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

 


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar img={data.imageUrl}/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
              src={
                
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    
                    options={options}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  /> 
                
                </div>

              ))}
<div className="formInput" key='tags'>
<Dropdown
                  isSearchable
                  isMulti
                  placeHolder="Velg..."
                  options={options}
                  id='tags'
                  onChange={(value) => setTags({'tags':value.map(c => c.value)}) }
                />
              </div>
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
