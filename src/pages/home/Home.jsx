import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useContext, useState, useEffect, useRef  } from "react";
import {
  doc,
  collection,
  serverTimestamp,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import LoadingPage from './LoadingPage.js'
import RegistrationForm from "../../components/popup/RegistrationForm";

const Home = () => {
  const [colorTheme, setColorTheme] = useState('green-theme');
  const { currentUser } = useContext(AuthContext);
  const [cTheme, setCTheme] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const inputElement = useRef();
  const myButtonRef = useRef(null);
  const userID = currentUser.uid;




 


  // useEffect(() => {
  //   // LISTEN (REALTIME)
   
  //   const unsub = onSnapshot(
      
  //     collection(db, "userTheme"),
      
  //     (snapShot) => {
        
  //       let list = [];

  //       snapShot.docs.forEach((doc) => {
  //       if(doc.id === userID){
  //         list.push({id: doc.id, ...doc.data()});
  //       }
        
  //       setColorTheme(list)
  //       setCTheme(...colorTheme)
  //     });
  //   },  
  //   (error) => {
  //     console.log(error);
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, );

  return (
    <div className={`home `}>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="employees" />
          <Widget type="services" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div hidden={true}>
        <RegistrationForm  buttonName='Register deg' ref_reg={myButtonRef} />
        </div>
        
        
        <div className="charts">
          <Featured />
          <Chart title="Siste 6 måneder (inntekt)" aspect={4/ 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Siste transaksjoner</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
