import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="employees" />
          <Widget type="services" />
          <Widget type="order" />
          <Widget type="earning" />
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
