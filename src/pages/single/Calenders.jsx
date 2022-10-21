import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";


import React from 'react';


var CLIENT_ID = process.env.CLIENT_ID;
var DISCOVERY_DOCS = process.env.DISCOVERY_DOCS;
var SCOPES = process.env.SCOPES;
var gapi = window.gapi


class Calendars extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = process.env.CALENDAR_ID;
    this.getEvents = this.getEvents.bind(this);
   
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      API_KEY: process.env.GOOGLE_CAL_API_KEY,
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
        // console.log('EVENTS: ', events['iCalUID'])
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
      'apiKey': process.env.GOOGLE_CAL_API_KEY
    }).then(function() {
      return gapi.client.request({
        'path': `https://www.googleapis.com/calendar/v3/users/me/calendarList/${this.calendar}`,
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
       <Sidebar />
       <div className="newContainer">
         <Navbar />
       <div>
       <iframe
        src="https://calendar.google.com/calendar/embed?src=mnlbc4vk9vsouso942iti2geec%40group.calendar.google.com&ctz=America%2FMexico_City"
        style={{ border: "0" }}
        width="100%"
        height="700"
        frameBorder="0"
        scrolling="no"
      />
</div></div></div>
    )
  }
}
export default Calendars;

