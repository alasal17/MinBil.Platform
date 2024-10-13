import { useContext, useState } from "react";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
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

  
  return (
   <div style={{}}>


   
  
    
			{/* <div className="form-left">
				<img src="https://cdn.dribbble.com/users/207059/screenshots/16573461/media/f154d82ff06254c9d49bd8ddda1db06f.gif" loading="lazy" height={'300px'} width={'600px'} alt="form"/>
			</div> */}
			<form className="form-detail" onSubmit={handleLogin} autoComplete="off">
			
      
            <Modal.Body>
        <div className="row mt-2">
                <div className="col-md-6" key='email'><label className="labels">E-post</label>
                <input type="text" name="your-email" id="your-email" className="form-control" placeholder="E-post" autoComplete="off"  onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="col-md-6" key='password'><label className="labels">Passord</label>
                <input type="password" id="password" className="form-control" placeholder="Passord" autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>

            
	
 
				
			
					
            </Modal.Body>   
            {/* <div class="g-recaptcha" data-sitekey="6LfP018qAAAAAN6GWXWuVklZjbqa_ez3TqAfp4kz"></div>  */}
            <Modal.Footer>
  <div className="row mt-2">
            <div className="col-md-12 d-flex justify-content-between align-items-left ">
            <button  type="submit" name="register" className="register btn btn-primary" > Logg inn </button>
          {error && <span>Feil e-post eller passord!</span>}
          </div>
         </div>
        
        
            </Modal.Footer>
			</form>


    </div>
  );
};

export default Login;
