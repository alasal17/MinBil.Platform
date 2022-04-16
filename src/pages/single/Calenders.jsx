import React from "react";
import Calendar from "@ericz1803/react-google-calendar";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { css } from "@emotion/react";

const Calendars = () => {
const API_KEY = "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s";
let calendars = [
  {calendarId: "smao1k7j2h80qrhdj7nch07210@group.calendar.google.com", color: "rgb(63, 191, 63)"}
];
let styles = {
  //you can use object styles (no import required)
  calendar: {
    borderWidth: "3px", //make outer edge of calendar thicker
  },
  
  //you can also use emotion's string styles
  today: css`
   /* highlight today by making the text red and giving it a red border */
    color: red;
    border: 1px solid red;
  `
}

    return (
      <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
      <div>
        <Calendar apiKey={API_KEY} calendars={calendars}  styles={styles}/>
      </div>
      </div>
      </div>
    )

}
export default Calendars;