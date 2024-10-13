import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ServiceTable from "../../components/datatable/ServiceTable"
import React,{useState, useContext, useRef} from 'react';
import {
  collection,
  onSnapshot,
  where,
  query
} from "firebase/firestore";
import { AuthContext} from "../../context/AuthContext";
import { auth, db, storage } from "../../firebase";
import RegistrationForm
 from "../../components/popup/RegistrationForm";
const ServicesList = ({pageTitle}) => {
  const [showPage, setShowPage] = useState(true);
  const [data, setData] = useState({});
  const {currentUser} = useContext(AuthContext);
  const [colorTheme, setColorTheme] = useState('green-theme');
  const [cTheme, setCTheme] = useState('');
  const userID = currentUser.uid;
  const postsCollectionRef = collection(db, "company");
  const myButtonRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  return (
    <div className="list">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="listContainer">
      <Navbar onClick={() => setSidebarOpen(!sidebarOpen)} />
        <ServiceTable pageTitle={pageTitle} />
      </div>
      <div hidden={true}>
        <RegistrationForm  buttonName='Register deg' ref_reg={myButtonRef} />
        </div>
    </div>
  )
}

export default ServicesList