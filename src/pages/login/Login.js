import { useContext, useState } from "react";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import React from 'react';

import './login.css'

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)


  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  // https://cdni.iconscout.com/illustration/premium/thumb/workers-of-car-service-center-painting-car-2953445-2451628.png
  
  return (
   <div style={{}}>
    

   
      
    <div className="page-content" >
		
    <div className="form-v6-content">
    
			<div className="form-left">
				<img src="https://cdn.dribbble.com/users/207059/screenshots/16573461/media/f154d82ff06254c9d49bd8ddda1db06f.gif" height={'400px'} width={'600px'} alt="form"/>
			</div>

			<form className="form-detail" onSubmit={handleLogin} autoComplete="off">


				
				<div className="form-row">
					<input type="text" name="your-email" id="your-email" className="input-text" placeholder="E-post"  onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div className="form-row">

					<input type="password" id="password" className="input-text" placeholder="Passord" autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>

				</div>
				
			
					<button style={{marginLeft:'20px',marginRight:'20px' }} type="submit" name="register" className="register" > Logg inn </button>
          {error && <span>Wrong email or password!</span>}
          <Link to='/register'>
          <button style={{marginLeft:'20px'}} type="submit" name="register" className="sign-up" > Registrer deg </button>
       </Link>
			</form>
    </div>
	</div>
  

    </div>
  );
};

export default Login;
