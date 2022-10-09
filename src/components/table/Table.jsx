import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { Component }  from 'react';

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "BILVASK",
      img: "https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/2712/car-wash-business-plan.png",
      customer: "Geir Hansen",
      date: "1 Mars",
      amount: 799,
      method: "Vipps",
      status: "Godkjent",
    },
    {
      id: 2235235,
      product: "DEKKSKIFT",
      img: "https://dekkteam.no/wp-content/uploads/90-scaled-e1591872491700-720x506.jpg",
      customer: "Martine Dalh",
      date: "1 Mars",
      amount: 900,
      method: "Kort betaling",
      status: "Avventer",
    },
    {
      id: 2342353,
      product: "RENS",
      img: "https://imgs.letsdeal.com/bd09f11c-eab7-4c9a-9669-03e0a49191b1",
      customer: "Lise Nilsen",
      date: "1 Mars",
      amount: 850,
      method: "Kontantbetaling",
      status: "Godkjent",
    },
    {
      id: 2357741,
      product: "LAKKFORSEGLING",
      img: "https://blogg.wuerth.no/hs-fs/hubfs/wurth-evershine-lakkforsegling-3jpg.jpg?width=2000&name=wurth-evershine-lakkforsegling-3jpg.jpg",
      customer: "Waqas Butt",
      date: "1 Mars",
      amount: 2599,
      method: "Kontantbetaling",
      status: "Godkjent",
    },
    {
      id: 2342355,
      product: "DEKKSKIFT",
      img: "https://dekkteam.no/wp-content/uploads/90-scaled-e1591872491700-720x506.jpg",
      customer: "Maria Hassen",
      date: "28 Februar",
      amount: 900,
      method: "Vipps",
      status: "Godkjent",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Sporing ID</TableCell>
            <TableCell className="tableCell">Produkt</TableCell>
            <TableCell className="tableCell">Kunde</TableCell>
            <TableCell className="tableCell">Dato</TableCell>
            <TableCell className="tableCell">Beløp</TableCell>
            <TableCell className="tableCell">Betalingsmetode</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
