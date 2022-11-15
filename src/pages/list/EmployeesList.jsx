import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Employeestable from "../../components/datatable/Employeestable"
import React from 'react';

const EmployeesList = ({pageTitle}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Employeestable pageTitle={pageTitle}/>
      </div>
    </div>
  )
}

export default EmployeesList