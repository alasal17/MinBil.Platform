import "../single/single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import ServiceTable from "../../components/datatable/ServiceTable";
import React  from 'react';

import {useLocation} from 'react-router-dom';
const Sales = () => {
  const location = useLocation();
  const data = location.state.data



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
                src={data.imageUrl}
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
                  <span className="itemKey">Varighet:</span>
                  <span className="itemValue">{data.estimatedTime}</span>
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
        <ServiceTable pageTitle="Legg til nytt tjeneste" />
        </div>
      </div>
    </div>
  );
};

export default Sales;
