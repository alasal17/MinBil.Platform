// import React from 'react';



// function Calenders() {

//   var gapi = window.gapi
//   /* 
//     Update with your own Client Id and Api key 
//   */
//   var CLIENT_ID = "109250490111-ci68ark2794o45ki6cdb6h5phdefpp59.apps.googleusercontent.com"
//   var API_KEY = "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s"
//   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
//   var SCOPES = "https://www.googleapis.com/auth/calendar.events"

//   const handleClick = () => {
//     gapi.load('client:auth2', () => {
//       console.log('loaded client')

//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES,
//       })

//       gapi.client.load('calendar', 'v3', () => console.log('bam!'))

//       gapi.auth2.getAuthInstance().signIn()
//       .then(() => {
        
//   //       var event = {
//   //         'summary': 'Awesome Event!',
//   //         'location': '800 Howard St., San Francisco, CA 94103',
//   //         'description': 'Really great refreshments',
//   //         'start': {
//   //           'dateTime': '2020-06-28T09:00:00-07:00',
//   //           'timeZone': 'America/Los_Angeles'
//   //         },
//   //         'end': {
//   //           'dateTime': '2020-06-28T17:00:00-07:00',
//   //           'timeZone': 'America/Los_Angeles'
//   //         },
//   //         'recurrence': [
//   //           'RRULE:FREQ=DAILY;COUNT=2'
//   //         ],
//   //         'attendees': [
//   //           {'email': 'lpage@example.com'},
//   //           {'email': 'sbrin@example.com'}
//   //         ],
//   //         'reminders': {
//   //           'useDefault': false,
//   //           'overrides': [
//   //             {'method': 'email', 'minutes': 24 * 60},
//   //             {'method': 'popup', 'minutes': 10}
//   //           ]
//   //         }
//   //       }

//   //       var request = gapi.client.calendar.events.insert({
//   //         'calendarId': 'primary',
//   //         'resource': event,
//   //       })

//   //       request.execute(event => {
//   //         console.log(event)
//   //         window.open(event.htmlLink)
//   //       })
        

//         /*
//             Uncomment the following block to get events
//         */

//         // get events
//         gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         }).then(response => {
//           const events = response.result.items
//           console.log('EVENTS: ', events)
//         })

    

//       })
//     })
//   }


//   return (
//     <div className="App">
//       <header className="App-header">
     
//         <p>Click to add event to Google Calendar</p>
//         <p style={{fontSize: 18}}>Uncomment the get events code to get events</p>
//         <p style={{fontSize: 18}}>Don't forget to add your Client Id and Api key</p>
//         <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
//       </header>
//     </div>
//   );
// }

// export default Calenders;

import React from "react";
import Calendar from "@ericz1803/react-google-calendar";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { css } from "@emotion/react";

const API_KEY = "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s";
let calendars = [
  {calendarId: "iuaup2k6s3ivq9lbnim4sonpu4@group.calendar.google.com"},
  {
    calendarId: "YOUR_CALENDAR_ID_2",
    color: "#B241D1" //optional, specify color of calendar 2 events
  }
];

class Calendars extends React.Component {
  render() {
    return (
      <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
      <div>
        <Calendar apiKey={API_KEY} calendars={calendars} />
      </div></div></div>
    )
  }
}
export default Calendars;