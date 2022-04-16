import "../single/single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import ProductTable from "../../components/datatable/ProductTable";
import { useContext, useState,useEffect } from "react";
import { auth, db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Sales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.map((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list[0]);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Endre</div>
            <h1 className="title">Produkt informasjon</h1>
            <div className="item">
              <img
                src={data.img}
                alt="dd"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Beskrivelse:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pris:</span>
                  <span className="itemValue">{data.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stikk ord</span>
                  <span className="itemValue">
                  {data.tags}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Land:</span>
                  <span className="itemValue"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Brukerforbruk (siste 6 måneder)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Produkter</h1>
        <ProductTable pageTitle="Legg til nytt produkt" />
        </div>
      </div>
    </div>
  );
};

export default Sales;
