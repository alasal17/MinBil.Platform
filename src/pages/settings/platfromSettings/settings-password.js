import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    passord: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Endre passord"
          title="Passord"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Nye passord"
            margin="normal"
            name="passord"
            onChange={handleChange}
            type="passord"
            value={values.passord}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Bekreft passord"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="passord"
            value={values.confirm}
            variant="outlined"
          />
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
            Oppdater
          </Button>
        </Box>
      </Card>
    </form>
  );
};
