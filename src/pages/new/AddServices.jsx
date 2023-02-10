import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,

} from "firebase/firestore";

import Select from "react-select";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect }  from 'react';
import Dropdown from "./Dropdown";
import { AuthContext } from "../../context/AuthContext";




const AddServices = ({ inputs, title}) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});

  const [per, setPerc] = useState(null);
  const [tagsData, setTags] = useState([]);

  const navigate = useNavigate()
  const postsCollectionRef = collection(db, "services");


  
  const options = [
    { value: "Dekkskift", label: "Dekkskift" },
    { value: "Polering", label: "Polering" },
    { value: "Service", label: "Service" },
    { value: "Mekanikk", label: "Mekanikk" },
    { value: "Bilvask", label: "Bilvask" },
    { value: "Lakering", label: "Lakering" },
    { value: "EU-kontroll", label: "EU-Kontroll" },
    { value: "Fjerne-rust", label: "Fjerne rust" },
    { value: "Sjekk-lufttrykk", label: "Sjekk lufttrykk" },
    
    { value: "Utvendig vask", label: "Utvendig vask" },
    { value: "Innvendig vask", label: "Innvendig vask" },
    { value: "Motorvask", label: "Motorvask" },
    { value: "Innvendig rens", label: "Innvendig rens" },
    { value: "Lakkrens", label: "Lakkrens" },
    { value: "Rens av matter, gummi etc", label:"Rens av matter, gummi etc" },
    { value: "Polering", label: "Polering" }
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
  


    setData({ ...data, [id]:value})
    if(id ==='price' || id === 'estimatedTime'){
      setData({ ...data, [id]: Number(value)})
    }

    if(id === 'estimatedTime'){
     
      if (value >= 60){
        setData({ ...data, estimatedTime:value, calculatedEstimatedTime: (String(parseInt(value)/ 60 +' t'))})
      }
      if(value%60 !== 0 ){
        setData({ ...data,estimatedTime:value,  calculatedEstimatedTime: (String(parseInt(parseInt(value)/ 60) +' t ' + Number(value)%60 + ' min'))})
      }
    else{
      setData({ ...data,estimatedTime:value, calculatedEstimatedTime: (String(parseInt(value)/ 60 +' t'))})
    }
      
    }

      
  
    else{
      setData({ ...data, [id]: value, calculatedEstimatedTime:0});}

  };

  console.log(data)


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      
      await addDoc(postsCollectionRef, {
        description:data.description,
        estimatedTime:data.estimatedTime,
        imageUrl:data.imageUrl,
        title:data.title,
        status:true,
        calculatedEstimatedTime:data.calculatedEstimatedTime,
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
          <div className="left" style={{marginTop:'40px'}}>
            <img 
              src={
                
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
              <div className="row mt-2">
             <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
          </div>   </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">

               
              </div>
              <div className="row mt-2">
                      
              {inputs.map((input) => (
             
                 <div className="col-md-6">
                <div className="" key={input.id}>
               
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    className="form-control"
                    options={options}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  /> 
                
      
                </div>     </div>
              


              ))} 
            <div className="col-md-6">
            <label>Pris</label>
            <input
                          type="text"
                          className="form-control"
                          id="price"
                          onChange={handleInput}
                        />
                  </div>   

        

       
                <div className="col-md-12">
                <label>Tags</label>
            <Select
                          placeholder="Tags..."
                          defaultValue={options.value}
                          onChange={(value) => setTags({'tags':value.map(c => c.value)}) }
                          options={options}
                          isMulti
                          name="tags"
                 
                        />
                </div>

              </div>
              <div className="row mt-2">
              <div className="col-md-6">
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
                 </div></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
