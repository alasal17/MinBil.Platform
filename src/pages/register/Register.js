// import {useState} from 'react'
// import './forms.css'
// import {auth} from "../../firebase";
// import {useNavigate, Link} from 'react-router-dom'
// import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'



// function Register() {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [error, setError] = useState('')
//     const navigate = useNavigate()
    
  
//     const validatePassword = () => {
//       let isValid = true
//       if (password !== '' && confirmPassword !== ''){
//         if (password !== confirmPassword) {
//           isValid = false
//           setError('Passwords does not match')
//         }
//       }
//       return isValid
//     }
  
//     const register = e => {
//       e.preventDefault()
//       setError('')
//       if(validatePassword()) {
//         // Create a new user with email and password using firebase
//           createUserWithEmailAndPassword(auth, email, password)
//           .then(() => {
//             sendEmailVerification(auth.currentUser)   
//             .then(() => {
              
//               // navigate('/verify-email')
//               navigate('/login')
//             }).catch((err) => alert(err.message))
//           })
//           .catch(err => setError(err.message))
//       }
//       setEmail('')
//       setPassword('')
//       setConfirmPassword('')
//     }
  
//     return (
//       <div className="login">
//         <div className='auth'>
//           <h1>Register</h1>
//           {error && <div className='auth__error'>{error}</div>}
//           <form onSubmit={register} name='registration_form'>
//             <input 
//               type='email' 
//               value={email}
//               placeholder="Enter your email"
//               required
//               onChange={e => setEmail(e.target.value)}/>
  
//             <input 
//               type='password'
//               value={password} 
//               required
//               placeholder='Enter your password'
//               onChange={e => setPassword(e.target.value)}/>
  
//               <input 
//               type='password'
//               value={confirmPassword} 
//               required
//               placeholder='Confirm password'
//               onChange={e => setConfirmPassword(e.target.value)}/>
  
//             <button type='submit'>Register</button>
//           </form>
//           <div className="line"></div>
//           <span>
//           Har du allerede en konto? 
//             <Link to='/login'>
//             <br></br>
//             <button style={{backgroundColor: 'rgb(53, 146, 34)'}}>
//             Login
//             </button>
              
//               </Link>
//           </span>
//         </div>
//       </div>
//     )
//   }
  
//   export default Register

import {useState} from 'react'

import {auth} from "../../firebase";
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import './register.css'
import { PasswordOutlined } from '@mui/icons-material';


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
    

   
      
    <div className="page-content-sign-up" >
		
    <div className="form-v6-content-sign-up">
    
			<div className="form-left-sign-up" style={{ borderRight: '5px solid #2a7ffe', marginLeft:'10%'}}>
				{/* <img src="https://cdn.dribbble.com/users/207059/screenshots/16573461/media/f154d82ff06254c9d49bd8ddda1db06f.gif" height={'400px'} width={'600px'} alt="form"/> */}
        <h3 style={{color:'black', paddingTop:'0', paddingRight:'10%'}}>Velkommen til Minbil-plattform</h3>
        <p style={{color:'black', margin:'20px'}}>Det nye CRM-et som er skreddesydd for ---</p>
			</div>
			<form className="form-detail-sign-up" style={{ paddingLeft:'6%'}} onSubmit={register}>
				
				<div className="form-row-sign-up">
					<input type="text" name="your-email" id="your-email" className="input-text-sign-up " placeholder="Email Address"  value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div className="form-row-sign-up">
					<input type="password" name="password" id="password" className="input-text-sign-up" placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}/>
				</div>

        <div className="form-row-sign-up">
					<input type="password" name="password" id="password" className="input-text-sign-up" placeholder="Password"  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
				</div>
				
        <div className="form-row-sign-up">
					<button style={{marginLeft:'20px',marginRight:'20px' }} type="submit" name="register" className="register-sign-up" > Register </button>
          {error && <span>Wrong email or password!</span>}

          </div>
          <div className="form-row-sign-up">
          <Link to='/login'>
          <span style={{paddingRight:'10px'}}>Er du allrede en bruker?</span>
          <button type="button" name="register" className="sign-up" > Logg inn </button>
          
       </Link>
       </div>
			</form>
    </div>
	</div>
  

    </div>
    )
  }
  
  export default Register