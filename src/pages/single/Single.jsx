import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

import {useLocation} from 'react-router-dom';

const Single = () => {
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
            <h1 className="title">Informasjon</h1>
            <div className="item">
              <img src={data.img} alt="" className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">{data.displayName}</h1>
                
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefon:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Adresse:</span>
                  <span className="itemValue">{data.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Land:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Brukerforbruk (siste 6 måneder)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Siste transaksjoner</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
