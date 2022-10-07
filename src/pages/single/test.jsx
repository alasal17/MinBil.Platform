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