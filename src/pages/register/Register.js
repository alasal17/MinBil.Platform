

import {useState} from 'react'

import {auth} from "../../firebase";
import {useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import './register.css'
import { Modal } from 'react-bootstrap';

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
  
    const validatePassword = () => {
      let isValid = true
      if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
          isValid = false
          setError('Passwords does not match')
        }
      }
      return isValid
    }
  
    const register = e => {
      e.preventDefault()
      setError('')
      if(validatePassword()) {
        // Create a new user with email and password using firebase
          createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            sendEmailVerification(auth.currentUser)   
            .then(() => {
              

              navigate('/verify-email')
              
             
              
            }).catch((err) => alert(err.message))
          })
          .catch(err => setError(err.message))
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  
    return (
      <div style={{}}>
    
  

   
  
    
{/* <div className="form-left">
  <img src="https://cdn.dribbble.com/users/207059/screenshots/16573461/media/f154d82ff06254c9d49bd8ddda1db06f.gif" loading="lazy" height={'300px'} width={'600px'} alt="form"/>
</div> */}
<form className="form-detail" onSubmit={register} autoComplete="off">

  
      <Modal.Body>
  <div className="row mt-2">
          <div className="col-md-12" key='email'><label className="labels">E-post</label>
          <input type="text"  name="your-email" id="your-email" required className="form-control " placeholder="Email Address"  value={email} onChange={e => setEmail(e.target.value)}/>          </div>
          </div>
          <div className="row mt-2">
          <div className="col-md-12" key='password'><label className="labels">Passord</label>
					<input type="password" required name="password" id="password" autoComplete="off" className="form-control" placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}/>
          </div></div>

          <div className="row mt-2">
          <div className="col-md-12" key='verify-password'><label className="labels">Gjenta passord</label>
					<input type='password'
              value={confirmPassword} 
              required
              placeholder='Confirm password' id="verify-password" className="form-control" autoComplete="off"  onChange={e => setConfirmPassword(e.target.value)}/>
          </div>
      </div>

      


  

    
      </Modal.Body>    
      <div className="g-recaptcha col-md-12 d-flex justify-content-between align-items-left" data-sitekey="6LfP018qAAAAAN6GWXWuVklZjbqa_ez3TqAfp4kz"></div>
      <Modal.Footer>
<div className="row mt-2">
      <div className="col-md-12 d-flex justify-content-between align-items-left ">
      <button  type="submit" name="register" className="register btn btn-primary" > Register </button>
    {error && <span>Feil e-post eller passord!</span>}
    </div>
   </div>

  
      </Modal.Footer>
      
</form>



   
   
    </div>
    )
  }
  
  export default Register
