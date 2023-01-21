import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

const states = [
  {
    value: 'oslo',
    label: 'Oslo'
  },
  {
    value: 'bergen',
    label: 'Bergen'
  },
  {
    value: 'trondheim',
    label: 'Trondheim'
  }
];

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    CEO: 'Sti ',
    companyName: 'Dev',
    email: 'sti@dev.io',
    phone: '',
    region: 'Oslo',
    country: 'Norge'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Informasjonen kan redigeres"
          title="Profil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                
                label="Dagligleder"
                name="CEO"
                onChange={handleChange}
                required
                value={values.CEO}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Bedriftsnavn"
                name="companyName"
                onChange={handleChange}
                required
                value={values.companyName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="E-post adresse"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Telefon nummer"
                name="phoneNumber"
                onChange={handleChange}
                type="text"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Land"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Velg by"
                name="region"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.region}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Lagre endringen
          </Button>
        </Box>
      </Card>
    </form>
  );
};
