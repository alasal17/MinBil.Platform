import React from 'react';

export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "users",
    headerName: "Bruker",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo_url} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "display_name",
    headerName: "Brukernavn",
    width: 200,
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
    field: "country",
    headerName: "Land",
    width: 100,
  },
  
  {
    field: "phone_number",
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
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];



export const productsColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "services",
    headerName: "Tjenester",
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
    field: "description",
    headerName: "Beskrivelse",
    width: 300,
  },  
  {
    field: "price",
    headerName: "Pris",
    width: 100,
  },
  {
    field: "tags",
    headerName: "Stikk ord",
    width: 200,
  },

  {
    field: "estimated_time",
    headerName: "Varighet",
    width: 150,
  },
  
];

export const employeesColums = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "employees",
    headerName: "Ansette",
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
    field: "ful_name",
    headerName: "Full navn",
    width: 230,
  },
  
  {
    field: "role",
    headerName: "Rolle",
    width: 300,
  },  
  {
    field: "phone_number",
    headerName: "Telefon",
    width: 100,
  },
  {
    field: "hired_date",
    headerName: "Ansettelses dato",
    width: 200,
  },
  {
    field: "email",
    headerName: "E-post",
    width: 100,
  },

  
];

