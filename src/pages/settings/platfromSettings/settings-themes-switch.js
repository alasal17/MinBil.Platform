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
    Typography,
    TextField
  } from '@mui/material';
  import { useContext, useState,useEffect } from "react";
  import { DarkModeContext } from "../../../context/darkModeContext";
  import Switch from '@mui/material/Switch';
  import { styled } from '@mui/material/styles';
  import './Style.scss'
  import { AuthContext } from "../../../context/AuthContext";
  import {
    doc,
    collection,
    serverTimestamp,
    setDoc,
    onSnapshot,
  } from "firebase/firestore";
  import { auth, db, storage } from "../../../firebase";
  import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CallToActionIcon from '@mui/icons-material/CallToAction';
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  
  
  
  
  export const ThemeSwitch = ({classNameForStyle}) => {
    const label = { inputProps: { 'aria-label': 'Themes' } };
    const { dispatch } = useContext(DarkModeContext);
    const [colorTheme, setColorTheme] = useState('green-theme');
    const { currentUser } = useContext(AuthContext);
    const userID = currentUser.uid;


    const handleAddToDatabase = async (e) => {
        e.preventDefault();
 
        try {
          await setDoc(doc(db, "userTheme", userID), {
            uid: userID,
            backgroundColor:colorTheme,
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          console.log(err);
        }
       
      };

  
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('single')

    if(currentThemeColor){
        setColorTheme(currentThemeColor)
        
    }
  },[])
  
  const handleOnThemeClick = (theme) => {
    setColorTheme(theme);
    // localStorage.setItem('single', theme);
  }

  const handleChange = (event) => {
    setColorTheme(event.target.value);
    
  };
  
    return (
    <form  autoComplete="off" noValidate >
      <Card className={`${colorTheme}`}>
        <CardHeader
          subheader="Endre utseende"
          title="Themes"
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
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Varsel
              </Typography>
              <FormControlLabel
              control={(
              <Switch 
              inputProps={{ 'aria-label': 'controlled' }}   defaultChecked
               />)}
               label=""
               />
              {/* <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }}  />}
          label="MUI switch" onChange={handleDarkModeChange} onClick={() => dispatch({ type: "TOGGLE" })}
        /> */}
  


  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Theme</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={colorTheme}
        label="Theme"
        onChange={handleChange}
      >
  
        <MenuItem value={'green-theme'}> 
        <CallToActionIcon style={{color:'green'}} name="green-theme"/>&nbsp; Green</MenuItem>
        
        <MenuItem value={'black-theme'}> 
        <CallToActionIcon style={{color:'black'}} name="black-theme"/>&nbsp; Dark</MenuItem>
        
        <MenuItem value={'white-theme'}> 
        <CallToActionIcon style={{color:'grey'}} name="white-theme"/>&nbsp; Grey</MenuItem>
        
        <MenuItem value={'brown-theme'}> 
        <CallToActionIcon style={{color:'brown'}} name="brown-theme"/>&nbsp; Brown</MenuItem>
        
        <MenuItem value={'purple-theme'}> 
        <CallToActionIcon style={{color:'purple'}} name="purple-theme"/>&nbsp; Purple</MenuItem>
      
      </Select>
    </FormControl>



     {/*              
            <TextField
              fullWidth
              className="form-control companyInfoAccount"
              name="country"
              
              select
              SelectProps={{ native: true }}
              
              variant="outlined"
            >
             
                
                <div className='theme-options'>
                <option >
                 <div id='blue-theme'
                 onClick={() => handleOnThemeClick('blue-theme')}
                 className="active"
                 ></div>
 </option>
 <option>
                 <div id='green-theme'
                 onClick={() => handleOnThemeClick('green-theme')}
                 className="active"
                 ></div>
 </option>
 <option>
                 <div id='purple-theme'
                 onClick={() => handleOnThemeClick('purple-theme')}
                 className="active"
                 ></div>
 </option>
 <option>
                 <div id='brown-theme'
                 onClick={() => handleOnThemeClick('brown-theme')}
                 className="active"
                 > </div>
              </option>
              <option>    
                 <div id='yellow-theme'
                 onClick={() => handleOnThemeClick('yellow-theme')}
                 className="active"
                 ></div>
                 </option>
                 </div>
                
            </TextField>
                    
      
           
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
              />*/}
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
            onClick={handleAddToDatabase}
          >
            Lagre
          </Button>
        </Box>
      </Card>
    </form>
  )};
  