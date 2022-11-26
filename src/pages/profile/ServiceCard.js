import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect, useState,useContext } from "react";
import {
  collection,
  onSnapshot
} from "firebase/firestore";
import { AuthContext} from "../../context/AuthContext";
import { db } from "../../firebase";




export default function ServiceCard({ logo}) {


  const {currentUser} = useContext(AuthContext)
  const [data, setData] = useState([]);
  const user = currentUser.uid

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
       
          if (doc.data().uid === user){
          
          list.push({ id: doc.id, ...doc.data() });
          }
          
        })
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    )


    return () => {
      unsub();
    };
  }, []);

  return (
    <Grid container  spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {data.map(serviceData => 
      <Grid item xs={2} sm={4} md={4} key={serviceData.id}>
    <Card style={{margin:'40px'}}  sx={{ maxHeight: 345 }}>
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={logo} />
        }
        
        title={serviceData.title}
        subheader="September 14, 2016"
      />

      <CardMedia
        component="img"
        height="194"
        image={serviceData.imageUrl}
        alt={serviceData.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {serviceData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

 
      </CardActions>
     
    </Card>
    </Grid>
    )} 
    </Grid>
  );
}