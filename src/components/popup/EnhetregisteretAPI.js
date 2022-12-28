import React, { useState, useContext } from 'react';



export const ApiGetRequest =  async ({searchTerm})  => {
  const [altinnData, setAltinnData] = useState([]);


    fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      setAltinnData(data)
      console.log(data)

   
    return data

    })
    }
