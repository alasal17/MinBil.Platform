import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Employeestable from "../../components/datatable/Employeestable"
import React, { useState } from "react";


const EmployeesList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="list">
        <Sidebar sidebarOpen={sidebarOpen} />
      <div className="listContainer">
      <Navbar onClick={() => setSidebarOpen(!sidebarOpen)} />
        <Employeestable/>
      </div>
    </div>
  )
}

export default EmployeesList