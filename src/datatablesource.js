
import React from 'react';

export const employeesColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "employees",
    headerName: "Ansatte",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.imageUrl} alt="avatar" />
          {params.row.fulName}
        </div>
      );
    },
  },

  {
    field: "email",
    headerName: "E-post",
    width: 230,
  },

  {
    field: "address",
    headerName: "Adresse",
    width: 250,
  },
  {
    field: "hiredDate",
    headerName: "Ansatt dato",
    type: Date,
    width: 200,
  },
  
  {
    field: "phoneNumber",
    headerName: "Telefon",
    width: 150,
  },
  {
    field: "role",
    headerName: "Rolle",
    width: 150,
  },
  
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      if(params.row.status === 'true'){

        return (
          <div  className={`cellWithStatus ${params.row.status}`}>
            True
          </div>
        )
      }if (params.row.status !== 'true') {
        <div  className={`cellWithStatus ${params.row.status}`}>
            False
          </div>
        
      } 
      else{
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            Ukjent
          </div>
          )
          
        
      }
      
    },
  },
];

export const servicesColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "services",
    headerName: "Tjenester",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.imageUrl} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Tittel",
    width: 230,
  },
  {
    field: "description",
    headerName: "Beskrivelse",
    width: 300,
  },  
  {
    field: "smallCar",
    headerName: "Pris liten bil",
    width: 100,
  },
  {
    field: "normalCar",
    headerName: "Pris vanlig bil",
    width: 100,
  },
  {
    field: "bigCar",
    headerName: "Pris stor bil",
    width: 100,
  },
  {
    field: "tags",
    headerName: "Stikk ord",
    width: 200,
  },

  {
    field: "estimatedTime",
    headerName: "Varighet",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      if(params.row.status === true){

        return (
          <div  className={`cellWithStatus ${params.row.status}`}>
            Active
          </div>
        )
      }if(params.row.status !== true){
        return (
          <div  className={`cellWithStatus ${params.row.status}`}>
            Ikke active
          </div>
        )

      }else{
        <div  className={`cellWithStatus ${params.row.status}`}>
            Active
          </div>
      }
    },
  },
  
];


export const eventsColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "events" || "services",
    headerName: "Eventer",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo_url} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Tittel",
    width: 230,
  },
  {
    field: "booked",
    headerName: "Åpent",
    width: 300,
  },  
  {
    field: "price",
    headerName: "Pris",
    width: 100,
  },
  {
    field: "services",
    headerName: "Eventer",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
         <img className="cellImg" src={params.row.photo_url} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  
  
];