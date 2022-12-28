
 import React, { useState, useContext, useEffect } from 'react';

import { ApiGetRequest } from './EnhetregisteretAPI.js';

 export const  EnhetregisteretAPIResualt =  ({searchTerm})  => {
    
    const [showData, setShowData] = useState();
    const [hiddenInfoText, setShowInfoText] = useState(false);
    const [altinnData, setAltinnData] = useState([]);

  useEffect(() =>{
   ApiGetRequest(searchTerm)
   const handleSubmit = async event => {
    event.preventDefault();
    fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      setAltinnData(data)
      console.log(data.organisasjonsnummer)
      
      if(data.organisasjonsnummer !== '' || data.organisasjonsnummer !== undefined){
        return(
          setShowData(<div className="row">
         
    <div className=" border-right">
  
  
  <div className="p-3 py-5">
              
                
  <div className="row mt-2">
  
    <div className="col-md-7">
      <label className="labels" >Bedriftsnavn</label>
    <input type="text" id ="companyName" readOnly className="form-control"  value={data.navn}/>
    </div>
  
    <div className="col-md-5">
      <label className="labels" >Registreringsdato Enhetsregisteret</label>
    <input  type="text" id="registrationDate" readOnly className="form-control"   value={data.registreringsdatoEnhetsregisteret}/>
    </div>
  
  </div>
  
  <div className="row mt-2">
  
    <div className="col-md-7">
      <label className="labels">Virksomheten beskrivelse Form</label>
    <input type="text" id ="businessCodeDescription" readOnly className="form-control"  value={data.naeringskode1.beskrivelse} />
    </div> 
  
     <div className="col-md-5">
      <label className="labels" >Virksomheten kode</label>
    <input  type="text" id="businessCode" readOnly className="form-control"  value={data.naeringskode1.kode} />
    </div>
  
  </div>
  
  <div className="row mt-2">
  
    <div className="col-md-5">
      <label className="labels" >Forettingsadresse</label>
    <input type="text" id ="businessStreetAddress" readOnly className="form-control"   value={data.forretningsadresse.adresse[0]}/>
    </div>
  
    <div className="col-md-3">
      <label className="labels"  >Postnummer</label>
    <input  type="text" id="zipCode" className="form-control"  readOnly  value={data.forretningsadresse.postnummer}/>
    </div>
  
    <div className="col-md-4">
      <label className="labels" >Post sted</label>
    <input  type="text" id="city" className="form-control" readOnly value={data.forretningsadresse.poststed}/>
    </div>
  
  </div>
  
  
  
  </div>
  
  
        
           
          
        </div>
        
      
            </div>)
        )

      }else{

        return(
          setShowData(<div className="row">
         
          
          
        <div className=" border-right">
  
  
      <h1>Noe gikk galt!</h1>
      <p>Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv igjen.</p>
  
  
  

  
  
        
           
          
        </div>
        
      
            </div>)
        )
        
      }
      
    
    }).catch(error => {
      setShowInfoText(true)
      return(
        setShowData(<div className="row">
         
          
          
        <div className=" border-right">
  
  
      <h1 className='error'>Noe gikk galt!</h1>
      <p className='text-center ' >Sjekk at du har skrevet inn riktig organisasjonsnummer og prøv igjen. {searchTerm}</p>
  
  
  

  
  
        
           
          
        </div>
        
      
            </div>)
      )
    });

   
      
   
    
    }
  
  });

         

          return(
            <div>
            <div>
              <div className='row'>
        <div className="col-md-12 mt-4 text-center">
  <button type="submit" onClick={''}
    
  className="btn btn-primary profile-button" >Hent data</button>
  </div></div>
            </div>

<div hidden={hiddenInfoText}>
<h4 className='text-center' style={{margin:'30px'}}>Hvorfor data fra Enhetsregisteret?</h4>
<p className='text-center'>Denne informasjonen bruker vi til å verfisere bedriftsinformasjon. 
  Det er for å unngå misforståelser og identitetstyveri.
  <br/>
  Denne informasjon vil ikke være synlig for dine kunder.
</p>
</div>
{setShowData}
</div>
          )
          
        
        }

          
       
        
   
   


export default EnhetregisteretAPIResualt;
