import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ServiceTable from "../../components/datatable/ServiceTable"
import React from 'react';

const ServicesList = ({pageTitle}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ServiceTable pageTitle={pageTitle} />
      </div>
    </div>
  )
}

export default ServicesList