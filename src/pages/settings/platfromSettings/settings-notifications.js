import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';
import { useContext, useState,useEffect } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';





export const SettingsNotifications = (props) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };


  return (
  <form {...props}>
    <Card>
      <CardHeader
        subheader="Administrer varslene"
        title="Varsleringer"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            

          
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Push-varsler"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Tekstmeldinger"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="
              Telefonsamtaler"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Meldinger
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="E-post"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Push-vasler"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Telefonsamtaler"
            />
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
          Lagre
        </Button>
      </Box>
    </Card>
  </form>
)};
