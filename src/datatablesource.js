export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Bruker",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "displayName",
    headerName: "Full navn",
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
    field: "phone",
    headerName: "Telefon",
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
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Produkt",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
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
    width: 200,
  },  
  {
    field: "price",
    headerName: "Pris",
    width: 100,
  },{
    field: "tags",
    headerName: "Stikk ord",
    width: 200,
  },
];
