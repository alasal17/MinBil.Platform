import "./list.scss"

import EventTable from "../../components/datatable/EventTable"
import React from 'react';

const EventList = ({pageTitle}) => {
  return (
    <div className="list">
     
      <div className="listContainer">

        <EventTable pageTitle={pageTitle} />
      </div>
    </div>
  )
}

export default EventList