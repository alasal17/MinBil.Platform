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

// import React from "react";
// import Calendar from "@ericz1803/react-google-calendar";
// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import { css } from "@emotion/react";

// const API_KEY = "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s";
// let calendars = [
//   {calendarId: "salam.alanezconsulting@gmail.com"},
//   {
//     calendarId: "YOUR_CALENDAR_ID_2",
//     color: "#B241D1" //optional, specify color of calendar 2 events
//   }
// ];

// class Calendars extends React.Component {
//   render() {
//     return (
//       <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//       <div>
//         <Calendar apiKey={API_KEY} calendars={calendars} />
//       </div></div></div>
//     )
//   }
// }
// export default Calendars;


// import 'whatwg-fetch';
// import React from 'react';

// import { Scheduler } from 'devextreme-react/scheduler';

// import CustomStore from 'devextreme/data/custom_store';
// import LogRocket from 'logrocket';
// LogRocket.init('p7ao4e/minbil-v1');
// function getData(_, requestOptions) {
//   const PUBLIC_KEY = 'IzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s';
//   const CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
//   const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
//   CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

//   return fetch(dataUrl, requestOptions).then(
//     (response) => response.json(),
//   ).then((data) => data.items);
// }

// const dataSource = new CustomStore({
//   load: (options) => getData(options, { showDeleted: false }),
// });

// const currentDate = new Date(2017, 4, 25);
// const views = ['day', 'workWeek', 'month'];

// class Calenders extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div className="long-title">
//           <h3>Tasks for Employees (USA Office)</h3>
//         </div>
//         <Scheduler
//           dataSource={dataSource}
//           views={views}
//           defaultCurrentView="workWeek"
//           defaultCurrentDate={currentDate}
//           height={500}
//           startDayHour={7}
//           editing={false}
//           showAllDayPanel={false}
//           startDateExpr="start.dateTime"
//           endDateExpr="end.dateTime"
//           textExpr="summary"
//           timeZone="America/Los_Angeles" />
//       </React.Fragment>

//     );
//   }
// }

// export default Calenders;




import Calendar from "@ericz1803/react-google-calendar";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";


import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import React, { useEffect, useState } from "react";

var CLIENT_ID = "109250490111-ci68ark2794o45ki6cdb6h5phdefpp59.apps.googleusercontent.com"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"
var gapi = window.gapi









class Calendars extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = 'salam.alanezconsulting@gmail.com';
    this.getEvents = this.getEvents.bind(this);
   
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      // calendar : 'salam.alanezconsulting@gmail.com',
      API_KEY: "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s",
      calenderList:[],
      events:''
      
    };
    
    
  }
  
  componentDidMount = () => {
    this.getEvents();
    this.handleClick();
    
  }
  
 
handleClick = () => {
  gapi.load('client:auth2', () => {
    console.log('loaded client')
    
    gapi.client.init({
      apiKey: this.state.API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })

    gapi.client.load('calendar', 'v3', () => console.log('bam!'))
    
    gapi.auth2.getAuthInstance().signIn()
    .then(() => {
      
//       var event = {
//         'summary': 'Awesome Event!',
//         'location': '800 Howard St., San Francisco, CA 94103',
//         'description': 'Really great refreshments',
//         'start': {
//           'dateTime': '2020-06-28T09:00:00-07:00',
//           'timeZone': 'America/Los_Angeles'
//         },
//         'end': {
//           'dateTime': '2020-06-28T17:00:00-07:00',
//           'timeZone': 'America/Los_Angeles'
//         },
//         'recurrence': [
//           'RRULE:FREQ=DAILY;COUNT=2'
//         ],
//         'attendees': [
//           {'email': 'lpage@example.com'},
//           {'email': 'sbrin@example.com'}
//         ],
//         'reminders': {
//           'useDefault': false,
//           'overrides': [
//             {'method': 'email', 'minutes': 24 * 60},
//             {'method': 'popup', 'minutes': 10}
//           ]
//         }
//       }

//       var request = gapi.client.calendar.events.insert({
//         'calendarId': 'primary',
//         'resource': event,
//       })

//       request.execute(event => {
//         console.log(event)
//         window.open(event.htmlLink)
//       })
      

      /*
          Uncomment the following block to get events
      */
     console.log("Test ", gapi.client.calendar.calendars)

      // get events
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        const events = response.result.items
        
        console.log('EVENTS: ', events)
        console.log('EVENTS: ', events['iCalUID'])
        this.setState.calenderList.push(events)

        console.log('LIST: ', this.state.calenderList)
      })

      return this.calenderList
      
    })
  })
}
getEvents(){
  
  let that = this;
  function start() {
    gapi.client.init({
      'apiKey': "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s"
    }).then(function() {
      return gapi.client.request({
        'path': `https://www.googleapis.com/calendar/v3/calendars/${this.calendar}/events`,
      })
    }).then( (response) => {
      let events = response.result.items
      
      this.setState({
        events
      
      }, ()=>{
        this.event.setState(events)
        console.log(that.state.events);
       
      })
    }, function(reason) {
      console.log(reason);
    });
  }
  gapi.load('client', start)
  console.log("Test")
  console.log(this.events)
  return this.state.events
}
  render() {
    return (
      <div className="new">
        <iframe
        src="https://calendar.google.com/calendar/embed?src=mnlbc4vk9vsouso942iti2geec%40group.calendar.google.com&ctz=America%2FMexico_City"
        style={{ border: "0" }}
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
      ></iframe>
   
      </div>
    )
  }
}
export default Calendars;






// import React, { useEffect, useState } from "react";

// import { gapi } from "gapi-script";
// import Event from "./Event.js";
 
// function Calendars() {
//   const [events, setEvents] = useState([]);
 
//   const calendarID = 'salam.alanezconsulting@gmail.com';
//   const apiKey = "AIzaSyBMBMekMw0Ba-oVxgDmZ6_owmpfr0ilQ-s";
//   const accessToken = 'ya29.a0Aa4xrXMkDVS-OCg5F2oFn3US2J73g52pJCSBA-3R3EtpMV2esLPqPivbMl9zSlxLjEFS23u8_TsypAYhFpxr4vbRGLwVgLUr8SXirBlZ5QClhRqyo6HK8erLbqD-02pbgklkjo80L-tYLWypDxLUdynbqgqAaCgYKATASARMSFQEjDvL9pIU8FeCEAbxN4fj4l1Y2Tg0163';
//   var CLIENT_ID = "109250490111-ci68ark2794o45ki6cdb6h5phdefpp59.apps.googleusercontent.com"
//   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
//   var SCOPES = "https://www.googleapis.com/auth/calendar.events"
//   var gapi = window.gapi
//   const getEvents = (calendarID, apiKey) => {
    
//     function initiate() {
      
      
      
//       gapi.client
//         .init({
//           apiKey: apiKey,
//         })
//         .then(function () {
//           return gapi.client.request({
//             path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
//           });
//         })
//         .then(
//           (response) => {
//             let events = response.result.items;
//             setEvents(events);
//           },
//           function (err) {
//             return [false, err];
//           }
//         );
//     }
//     gapi.load("client", initiate);
//   };
//  const handleClick = () => {

// }
//   useEffect(() => {
//     const events = getEvents(calendarID, apiKey);
//     setEvents(events);
//   }, []);
 
//   return (
//     <div className="App py-8 flex flex-col justify-center">
//       <h1 className="text-2xl font-bold mb-4">
//         React App with Google Calendar API!
//         <ul>
//           {events?.map((event) => (
//             <li key={event.id} className="flex justify-center">
//               <Event description={event.summary} />
//             </li>
//           ))}
//         </ul>
//       </h1>
//     </div>
//   );
// }
 
// export default Calendars;