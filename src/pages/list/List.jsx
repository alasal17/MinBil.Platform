import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import React, { Component }  from 'react';

const List = ({pageTitle}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable pageTitle={pageTitle}/>
      </div>
    </div>
  )
}

export default List